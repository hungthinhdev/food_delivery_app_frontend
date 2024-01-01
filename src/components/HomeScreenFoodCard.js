import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StaticImageService} from '../services';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {CartAction} from '../actions';
import {ApiContants, Colors, Fonts} from '../contants';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const HomeScreenFoodCard = ({id, name, description, price, image, rating }) => {
  const dispatch = useDispatch();
  const addToCart = foodId => dispatch(CartAction.addToCart({foodId}));
  const removeFromCart = foodId =>
    dispatch(CartAction.removeFromCart({foodId}));

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
    >
      <ImageBackground
        source={{
          uri: StaticImageService.getGalleryImage(
            image,
            ApiContants.STATIC_IMAGE.SIZE.SQUARE,
          ),
        }}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <Ionicons
            name="star"
            size={16}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={styles.CardRatingText}>{rating ?? 4.5}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{price}</Text>
        </Text>
        <AntDesign
          name="plus"
          color={Colors.DEFAULT_YELLOW}
          size={18}
          onPress={() => addToCart(id)}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
    fontWeight: "700",
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_14,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
  },
  CardPrice: {
    color: COLORS.primaryBlackHex,
  },
});

export default HomeScreenFoodCard;
