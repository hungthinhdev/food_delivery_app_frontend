import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {CategoryListItem, FoodCard, Separator} from '../components';
import {ApiContants, Colors, Fonts, Images} from '../contants';
import {RestaurantService, StaticImageService} from '../services';
import {Display} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {BookmarkAction} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListHeader = () => (
  <View
    style={{
      flexDirection: 'row',
      flex: 1,
      width: 40,
      justifyContent: 'flex-end',
    }}>
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopLeftRadius: 64,
        borderBottomLeftRadius: 64,
      }}
    />
  </View>
);

const ListFooter = () => (
  <View
    style={{
      flexDirection: 'row',
      flex: 1,
      width: 40,
    }}>
    <View
      style={{
        backgroundColor: Colors.LIGHT_YELLOW,
        width: 20,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
      }}
    />
  </View>
);

const RestaurantScreen = ({
  navigation,
  route: {
    params: {restaurantId},
  },
}) => {
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);

  useEffect(() => {
    RestaurantService.getOneRestaurantById(restaurantId).then(response => {
      setSelectedCategory(response?.data?.categories[0]);
      setRestaurant(response?.data);
    });
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    const dishes = restaurant?.foods?.filter(food => food?.category === selectedCategory);
    setSelectedDishes(dishes);
  };

  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    state =>
      state?.bookmarkState?.bookmarks?.filter(
        item => item?.restaurantId === restaurantId,
      )?.length > 0,
  );
  const addBookmark = () =>
    dispatch(BookmarkAction.addBookmark({restaurantId}));
  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({restaurantId}));

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <>
        <Image
          source={{
            uri: StaticImageService.getGalleryImage(
              restaurant?.images?.cover,
              ApiContants.STATIC_IMAGE.SIZE.SQUARE,
            ),
          }}
          style={styles.backgroundImage}
        />
        <ScrollView>
          <Separator height={Display.setHeight(35)} />
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon name="arrow-left" size={20} color="#545454" />
              </TouchableOpacity>
              <Text style={styles.title}>{restaurant?.name}</Text>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                color={Colors.DEFAULT_YELLOW}
                size={24}
                onPress={() =>
                  isBookmarked ? removeBookmark() : addBookmark()
                }
              />
            </View>
            <Text style={styles.tagText}>{restaurant?.tags?.join(' • ')}</Text>
            <View style={styles.ratingReviewsContainer}>
              <FontAwesome
                name="star"
                size={18}
                color={Colors.DEFAULT_YELLOW}
              />
              <Text style={styles.ratingText}>4.2</Text>
            </View>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={restaurant?.categories}
                keyExtractor={item => item}
                horizontal
                ListHeaderComponent={() => <ListHeader />}
                ListFooterComponent={() => <ListFooter />}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <CategoryListItem
                    name={item}
                    isActive={item === selectedCategory}
                    selectCategory={category => handleSelectCategory(category)}
                  />
                )}
              />
            </View>
            <View style={styles.foodList}>
                {selectedDishes.length > 0 ? (
                  selectedDishes.map(item => (
                    <FoodCard
                      key={item?.id}
                      {...item}
                      navigate={() =>
                        navigation.navigate('Food', {foodId: item?.id})
                      }
                    />
                  ))
                ) : (
                  <Text style={styles.notHaveAnyProducts}>Chưa có sản phẩm nào</Text>
                )}
              <Separator height={Display.setHeight(2)} />
            </View>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Display.setWidth(100),
    width: Display.setWidth(100),
  },
  mainContainer: {
    backgroundColor: Colors.SECONDARY_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
  },
  title: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  tagText: {
    marginHorizontal: 25,
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_GREY,
  },
  ratingReviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.DEFAULT_BLACK,
  },
  reviewsText: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  deliveryDetailText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
  deliveryDetailIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantType: {
    backgroundColor: Colors.LIGHT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  restaurantTypeText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_YELLOW,
  },
  categoriesContainer: {
    marginVertical: 20,
  },
  foodList: {
    marginHorizontal: 15,
  },
  notHaveAnyProducts: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "#fba83c",
  }
});

export default RestaurantScreen;
