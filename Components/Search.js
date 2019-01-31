import React from 'react'
import {View, TextInput, Button, StyleSheet, FlatList, Text} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBAPI'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _loadFilms(){
    if(this.searchedText.length>0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({
          films: data.results
          isLoading: false
        })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayLoading() {
    if(this.sate.isLoading) {
      return(
        <View style={style.loading_container}>
          <ActivityIndicator size='large'/>
          {}
        </View>
      )
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button style={styles.button} title='Rechercher' onPress={()=>this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._diplayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
  textinput: {
    marginLeft:5,
    marginRight:5,
    height:50,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5
  },
  button: {
    height: 50
  }
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
