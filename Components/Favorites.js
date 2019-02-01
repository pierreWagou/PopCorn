import React from 'react'
import {StyleSheet, Text, FlatList} from 'react-native'
import FilmList from './FilmList'
import {connect} from 'react-redux'

class Favorites extends React.Component {
  render() {
    console.log(this.props.favoritesFilm)
    return(
      <FilmList
        films={this.props.favoritesFilm}
        navigation={this.props.navigation}
        favoriteList={true}
      />
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
