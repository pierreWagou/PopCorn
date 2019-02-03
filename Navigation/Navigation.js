import React from 'react'
import {StyleSheet, Image} from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: "À l'affiche"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image style={styles.icon} source={require('../Images/ic_search.png')}/>
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return<Image style={styles.icon} source={require('../Images/ic_favorite.png')}/>
        }
      }
    },
    News: {
      screen: NewsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image style={styles.icon} source={require('../Images/ic_fiber_new.png')}/>
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
