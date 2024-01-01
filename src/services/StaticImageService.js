import {ApiContants} from '../contants';

const getFlagIcon = (
  code = 'IN',
  style = ApiContants.COUNTRY_FLAG.STYLE.FLAT,
  size = ApiContants.COUNTRY_FLAG.SIZE[64],
) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

const RESTAURANT_LOGO = {
  baskinrobbins:
    'https://tse4.mm.bing.net/th?id=OIP.2Ow_I-qw_vtyBvw5sUeR3AHaEK&pid=Api&P=0&h=180',
  pizzahut:
    'https://logolook.net/wp-content/uploads/2021/07/Pizza-Hut-Logo.png',
  subway:
    'https://logos-download.com/wp-content/uploads/2016/03/Subway_logo_white.png',
  mcdonalds: 'https://pngimg.com/uploads/mcdonalds/mcdonalds_PNG1.png',
  kfc: 'https://pngimg.com/uploads/kfc/kfc_PNG11.png',
  dominos: 'https://clipground.com/images/domino-logo-3.jpg',
  burgerking:
    'https://purepng.com/public/uploads/large/burger-king-logo-xua.png',
  starbucks: 'https://pngimg.com/uploads/starbucks/starbucks_PNG5.png',
};

// `${ApiContants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;
const getLogo = imageId => {
  return RESTAURANT_LOGO[imageId];
};

const RESTAURANT_POSTER = {
  baskinrobbins:
    'https://heavy.com/wp-content/uploads/2020/07/Baskin-Robbins-exterior.jpg?quality=65&strip=all',
  pizzahut: 'https://franchise.pizzahut.com/images/home_intro_img2.jpg',
  subway:
    'https://tse1.mm.bing.net/th?id=OIP.9n6YIVTMM8zvrx0ACNuiIAHaFr&pid=Api&P=0&h=180',
  kfc: 'https://cdn.newsapi.com.au/image/v1/de49dcd2d48eb33c96d2c02727c7b486?width=1024',
  dominos:
    'https://tse3.mm.bing.net/th?id=OIP.HW5VmPlJxBXdnalqNvZWRQHaD2&pid=Api&P=0&h=180',
  burgerking:
    'https://archplusinc.net/wp-content/uploads/2019/12/Shreve_BKSS_Exterior_1.jpg',
  starbucks:
    'https://tse2.mm.bing.net/th?id=OIP.J6N0I0dCFpQFAVKlQDZd8QHaE8&pid=Api&P=0&h=180',
  mcdonalds:
    'https://i.pinimg.com/originals/d5/56/fa/d556fae6c6ceea6b52ae95faf5ac43c0.jpg',
};

const getPoster = (imageId, quality = ApiContants.STATIC_IMAGE.QUALITY.SD) => {
  return RESTAURANT_POSTER[imageId];
};
// `${ApiContants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const GALLERY_IMAGE = {
  chickenmcnuggets:
    'https://tse1.mm.bing.net/th?id=OIP.07ZfV49jCP21FHBKBt7t0gHaEo&pid=Api&P=0&h=180',
  mcspicypaneer:
    'https://tse4.mm.bing.net/th?id=OIP.EFnkh4LNlnfVUmVdhav5rgHaD_&pid=Api&P=0&h=180',
  sundaestrawberry:
    'https://tse2.mm.bing.net/th?id=OIP.n0sOiCFjvl3UDZPS5UbAIgHaLH&pid=Api&P=0&h=180',
  ourworldfamousfries:
    'https://www.socialmoms.com/wp-content/uploads/2015/05/Fruit-Bruschetta.jpg',
  chickenmaharajamac:
    'https://live.staticflickr.com/1648/24266807722_67960028be.jpg',
  vegextravaganza: 'https://yumtamtam.de/ytt_images/Pizza-Bianca.jpg',
  vegloaded:
    'https://tse1.mm.bing.net/th?id=OIP.SY3vLIx3pk3EjgEUKrn6MwHaE8&pid=Api&P=0&h=180',
  mcflurrychococrunch:
    'http://mcdonaldsblog.in/wp-content/uploads/2015/08/McFlurry_McCafe.jpg',
  chickengoldendelight:
    'http://www.dominos.co.in/files/items/Chicken-Golden-Delight.png',
  mcchicken:
    'https://tse2.mm.bing.net/th?id=OIP.xQh7WveaJQO-6EYwuLRa0AHaFj&pid=Api&P=0&h=180',
  chickenwhopper:
    'https://soranews24.com/wp-content/uploads/sites/3/2020/03/bk5.jpg?resize=150',
  pizzamcpuff:
    'https://tse1.explicit.bing.net/th?id=OIP.v1USEf8HM7uZEEKzoVS-bQHaDg&pid=Api&P=0&h=180',
  spicygrillchickenburger:
    'https://www.mashed.com/img/gallery/copycat-burger-king-spicy-crispy-chicken-sandwich-recipe/l-intro-1620651447.jpg',
  mexicangreenwave:
    'https://tse4.mm.bing.net/th?id=OIP.XREz8rP6k8-K6IJ3ePDnsgHaE6&pid=Api&P=0&h=180',
  veggiesupreme:
    'https://i0.wp.com/www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven.png?w=1200&ssl=1',
  garlicbreadsticks:
    'https://tse3.mm.bing.net/th?id=OIP.vhL_He079QvTpjm92B8vRgHaE8&pid=Api&P=0&h=180',
  grilledchickenwings:
    'https://playswellwithbutter.com/wp-content/uploads/2019/05/GRILLED-CHICKEN-WINGS-8-1365x2048.jpg',
  mcswirlchocolate:
    'https://i.pinimg.com/originals/48/30/ac/4830ac2527218b7761821cddca26ef0e.png',
  icedtea:
    'https://www.pngall.com/wp-content/uploads/13/Iced-Tea-PNG-Photo.png',
  italianchickenfeast:
    'https://i.pinimg.com/originals/fa/7b/95/fa7b955e1663f2f2829c6d19af8c8751.jpg',
  spicedchickenmeatballs:
    'https://tse4.mm.bing.net/th?id=OIP.3BvVWdpVQkL6wDRAJgeBMAHaLH&pid=Api&P=0&h=180',
  baskinrobbins:
    'https://heavy.com/wp-content/uploads/2020/07/Baskin-Robbins-exterior.jpg?quality=65&strip=all',
  pizzahut: 'https://franchise.pizzahut.com/images/home_intro_img2.jpg',
  subway:
    'https://tse4.mm.bing.net/th?id=OIP.Uwp3lNl6qr3QRAW-6umhFgHaEU&pid=Api&P=0&h=180',
  burgers:
    'https://tse1.mm.bing.net/th?id=OIP.YQA-_2k7Nphixcv0SdUYlAHaFb&pid=Api&P=0&h=180',
  kfc: 'https://thumbs.dreamstime.com/b/bligh-park-australia-exterior-kfc-fast-food-restaurant-building-parking-bligh-park-australia-exterior-kfc-fast-food-193282834.jpg',
  dominospizza:
    'https://media.glassdoor.com/l/47/40/8c/5a/domino-s-a-neighborhood-staple.jpg',
  burgerking:
    'https://foodmenu.ph/wp-content/uploads/2021/02/burger-king-building-open-open.jpg',
  starbucks:
    'https://tse1.mm.bing.net/th?id=OIP.q23hSevWftQ5NV0_6lyhBwHaFE&pid=Api&P=0&h=180',
  zestychickenpocket:
    'https://tse1.mm.bing.net/th?id=OIP.LVV5BbFDK6RSp8pe-nuHLgHaFF&pid=Api&P=0&h=180',
  spicedtomatotwistnonveg:
    'https://tse2.mm.bing.net/th?id=OIP.U29UtR_9w7Gg4Av15cryNgHaE8&pid=Api&P=0&h=180',
  sundaechocolatebrownie:
    'https://tse3.mm.bing.net/th?id=OIP.rwnIhGbT7yalyTmVaJrxNgHaE8&pid=Api&P=0&h=180',
  mcspicychicken:
    'https://tse4.mm.bing.net/th?id=OIP.W3Ws0an5heBJMXp6Fm0QYwHaEK&pid=Api&P=0&h=180',
  chickensausage:
    'https://tse4.mm.bing.net/th?id=OIP.rTu6bPWGs6jb_M0SFKfscgHaE8&pid=Api&P=0&h=180',
  indianchickentikka:
    'https://flawlessfood.co.uk/wp-content/uploads/2021/03/Tandoori-Chicken-Tikka-Kebab-433-1536x1017.jpg',
  pepperbarbequechicken:
    'https://tse4.mm.bing.net/th?id=OIP.hToX3aegAjyKiifFO26OrAHaEJ&pid=Api&P=0&h=180',
  indiantandooripaneer:
    'https://2.bp.blogspot.com/-neI6rKuvsKI/VyN8GMrfhzI/AAAAAAAAHls/hugFFTKYgs8lrtUSXx0iEyG-KZwL4bPbwCLcB/s1600/tandoori-paneer-tikka4.jpg',
  margherita:
    'https://tse3.mm.bing.net/th?id=OIP.mrq9EI-sRaPx0JsrH87J3wHaHa&pid=Api&P=0&h=180',
  paneerandonion:
    'https://i0.wp.com/vegecravings.com/wp-content/uploads/2016/08/kadai-paneer-gravy-recipe-step-by-step-instructions.jpg?fit=806%2C720&quality=65&strip=all&ssl=1',
  stuffedgarlicbread:
    'https://tse2.mm.bing.net/th?id=OIP.Iy4CcpDtBBWRmHFI7XUozQHaJ3&pid=Api&P=0&h=180',
  crispyvegburger:
    'https://i0.wp.com/www.cookingfromheart.com/wp-content/uploads/2016/11/Vegetable-Zinger-Burger-5.jpg?resize=1024%2C739',
  crispyvegdoublepatty:
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/2/3/FNM_030123-Double-Patty-Veggie-Burgers_s4x3.jpg.rend.hgtvcom.616.462.suffix/1675435333436.jpeg',
  chickenwings:
    'https://tse1.mm.bing.net/th?id=OIP.Rq617kDxKXVZtblhM66DJAHaEK&pid=Api&P=0&h=180',
  chickentwistedwhopper:
    'https://tse4.mm.bing.net/th?id=OIP.tZKW5h1I8CiuYpG-4VqYpQHaEK&pid=Api&P=0&h=180',
  fries:
    'https://tse4.mm.bing.net/th?id=OIP.bjwIfbyk1X9FvFq6IMgHAAHaFj&pid=Api&P=0&h=180',
  chickenfries:
    'https://s3.amazonaws.com/images.ecwid.com/images/35478264/1612816328.jpg',
  hotcoffee:
    'https://tse3.mm.bing.net/th?id=OIP.q15MrqbzImBk0vAdEfKmOAHaE8&pid=Api&P=0&h=180',
  teawithmilk:
    'https://i.pinimg.com/originals/15/a5/86/15a586959f36bdab214c5d30a6cd2fd6.jpg',
  coldcoffee: 'https://wallpapercave.com/wp/wp5681998.jpg',
};


const getGalleryImage = (
  imageId,
  size,
  quality = ApiContants.STATIC_IMAGE.QUALITY.SD,
) => {
  // console.log(imageId, GALLERY_IMAGE[imageId]);
  if (GALLERY_IMAGE[imageId] !== '') {
    return GALLERY_IMAGE[imageId];
  } else {
    return 'https://www.pngall.com/wp-content/uploads/13/Iced-Tea-PNG-Photo.png'
  }
};
// `${ApiContants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;

export default {getFlagIcon, getLogo, getPoster, getGalleryImage};
