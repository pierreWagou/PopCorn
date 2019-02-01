import React from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity, Share, Platform} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBAPI'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    if(params.film!=undefined && Platform.OS=='ios') {
      return {
        headerRight:
          <TouchableOpacity style={styles.share_touchable_headerrightbutton} onPress={() => params.shareFilm()}>
            <Image style={styles.share_image} source={require('../Images/ic_share.png')}/>
          </TouchableOpacity>
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._shareFilm = this._shareFilm.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  componentDidMount() {
    // const action = {type:'TOGGLE_FILMDETAIL', value:this.state.film}
    // this.props.dispatch(action)
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id==this.props.navigation.state.params.idFilm)
    if(favoriteFilmIndex!=-1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return
    }
    this.setState({isLoading: true})
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => {this._updateNavigationParams()})
    })
  }

  _displayLoading() {
    if(this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _toggleFavorite() {
    const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    let sourceImage = require('../Images/ic_favorite_border.png')
    if(this.props.favoritesFilm.findIndex(item => item.id==this.state.film.id)!=-1) {
      sourceImage = require('../Images/ic_favorite.png')
    }
    return(
      <Image style={styles.favorite_image} source={sourceImage}/>
    )
  }

  _displayFilm() {
    const {film} = this.state
    if(this.state.film!=undefined) {
      return(
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}}/>
          <Text style={styles.title}>
            {film.title}
          </Text>
          <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description}>
            {film.overview}
          </Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average}
          </Text>
          <Text style={styles.default_text}>
            Nombre de vote: {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget: {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genres: {film.genres.map(function(genre){
                return genre.name
              }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companies: {film.production_companies.map(function(company){
              return company.name
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  _shareFilm() {
    const {film} = this.state
    Share.share({title: film.title, message: film.overview})
  }

  _displayFloatingActionButton() {
    const {film} = this.state
    if(film!=undefined && Platform.OS=='android') {
      return(
        <TouchableOpacity style={styles.share_touchable_floatingbutton} onPress={() => this._share()}>
          <Image style={styles.share_image} source={require('../Images/ic_share.png')}/>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 35,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  share_touchable_floatingbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
    // historicFilm: state.historicFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
