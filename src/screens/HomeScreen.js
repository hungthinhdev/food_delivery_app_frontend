import React, {useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  CategoryMenuItem,
  RestaurantCard,
  RestaurantMediumCard,
  Separator,
  HomeScreenFoodCard,
} from '../components';
import {Colors, Fonts, Mock} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {RestaurantService} from '../services';
import {FoodService} from "../services";
import {Display} from '../utils';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};

const HomeScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState();
  const [restaurants, setRestaurants] = useState(null);
  const [activeSortItem, setActiveSortItem] = useState('recent');

  const [searchText, setSearchText] = useState('');
  const [foodList, setFoodList] = useState(null);
  const [sortedFood, setSortedFood] = useState(null);

  useEffect(() => {
    FoodService.getAllFoods().then(response => {
      if (response.status == true) {
        setFoodList(response.data)
        setSortedFood(response.data)
      }
    })
  }, [])

  const ListRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      RestaurantService.getRestaurants().then(response => {
        if (response?.status) {
          setRestaurants(response?.data);
        }
      });
    });
    return unsubscribe;
  }, []);

  const searchFood = (search) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setSortedFood([
        ...foodList.filter((item) => {
          return item.name?.toLowerCase().includes(search.toLowerCase())
            || item.category?.toLowerCase().includes(search.toLowerCase())
            || item.description?.toLowerCase().includes(search.toLowerCase())
            || item.ingredients?.toLowerCase().includes(search.toLowerCase())
        }),
      ]);
    }
  };

  const resetSearchFood = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setSortedFood([...foodList]);
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              size={25}
              color={Colors.DEFAULT_GREY}
            />
            <TextInput 
              style={styles.searchText}
              placeholder="Tìm kiếm món ăn"
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                searchFood(text);
              }}
              placeholderTextColor={"#52555A"}
            />
            <TouchableOpacity
              onPress={() => resetSearchFood()}  
            >
              <Ionicons
                name="close-outline"
                size={25}
                color={COLORS.primaryOrangeHex}
                style={{ paddingRight: 8, }}
                />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({name, logo}) => (
            <CategoryMenuItem
              key={name}
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              setActiveCategory={(name) => { searchFood(name) }}
            />
          ))}
        </View>
      </View>
      <ScrollView style={styles.listContainer}>
        {/** Dishes FlatList Start */}
        <Text style={styles.CoffeeBeansTitle}>Danh sách món ăn</Text>

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>Không có món ăn nào</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedFood}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Food', {foodId: item?.id})
                }}>
                <HomeScreenFoodCard
                  key={item?.id}
                  {...item}                  
                />
              </TouchableOpacity>
            );
          }}
        />
        { /** Dishes FlatList End */}

        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Danh sách nhà hàng</Text>
            <Text style={styles.listHeaderSubtitle}>See All</Text>
          </View>
          <FlatList
            data={restaurants}
            keyExtractor={item => item?.id}
            horizontal
            ListHeaderComponent={() => <Separator width={20} />}
            ListFooterComponent={() => <Separator width={20} />}
            ItemSeparatorComponent={() => <Separator width={10} />}
            renderItem={({item}) => (
              <RestaurantCard
                {...item}
                navigate={restaurantId =>
                  navigation.navigate('Restaurant', {restaurantId})
                }
              />
            )}
          />
        </View>

        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Gần đây</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'favorite')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('favorite')}>
            <Text style={styles.sortListItemText}>Ưa thích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'rating')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}>
            <Text style={styles.sortListItemText}>Xếp hạng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'popular')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}>
            <Text style={styles.sortListItemText}>Phổ biến</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'trending')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}>
            <Text style={styles.sortListItemText}>Xu hướng</Text>
          </TouchableOpacity>
        </View>
        {restaurants?.map(item => (
          <RestaurantMediumCard {...item} key={item?.id} />
        ))}
        <Separator height={Display.setHeight(5)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  selectedLocationText: {
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    position: 'absolute',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchText: {
    color: COLORS.primaryBlackHex,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10,
    flexGrow: 1,
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 30,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.DEFAULT_YELLOW,
    height: 40,
  },
  sortListItemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_4,
    fontWeight: "700",
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: 18,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_16,
    marginLeft: SPACING.space_18,
    marginTop: SPACING.space_40,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
  },
});

export default HomeScreen;
