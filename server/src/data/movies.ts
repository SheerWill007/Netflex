import { Movie, Category, HeroContent } from '../types';

const createMovie = (
  id: string,
  title: string,
  category: string,
  rating: number,
  year?: number,
  maturityRating?: string,
  seasons?: number
): Movie => ({
  id,
  title,
  imageUrl: `https://picsum.photos/seed/${encodeURIComponent(id)}/800/450`,
  category,
  rating,
  year,
  maturityRating,
  seasons,
  isHD: true,
  type: seasons ? 'series' : 'movie',
  description: `${title} is a captivating ${category.toLowerCase()} that has earned a ${rating}% match rating.`
});

export const heroContent: HeroContent = {
  id: 'hero-1',
  title: 'Ember & Static',
  description: 'When a small-town radio host starts picking up signals from a future no one has lived yet, she has to decide how much of tomorrow anyone deserves to know.',
  tag: 'N-CLONE ORIGINAL',
  imageUrl: 'https://picsum.photos/seed/ember-static/1920/1080',
  rating: 98,
  year: 2026,
  maturityRating: '16+',
  seasons: 3,
  isHD: true
};

const moviesData: Movie[] = [
  // Trending Now
  createMovie('m1', 'Stranger Things', 'Trending Now', 96, 2016, '16+', 4),
  createMovie('m2', 'The Crown', 'Trending Now', 94, 2016, '16+', 6),
  createMovie('m3', 'Squid Game', 'Trending Now', 95, 2021, '18+', 2),
  createMovie('m4', 'Wednesday', 'Trending Now', 93, 2022, '13+', 1),
  createMovie('m5', 'Bridgerton', 'Trending Now', 92, 2020, '16+', 3),
  createMovie('m6', 'The Witcher', 'Trending Now', 91, 2019, '18+', 3),
  createMovie('m7', 'Money Heist', 'Trending Now', 94, 2017, '16+', 5),
  createMovie('m8', 'Ozark', 'Trending Now', 95, 2017, '18+', 4),
  createMovie('m9', 'Narcos', 'Trending Now', 93, 2015, '18+', 3),
  createMovie('m10', 'Dark', 'Trending Now', 97, 2017, '16+', 3),
  createMovie('m11', 'Outer Banks', 'Trending Now', 90, 2020, '16+', 3),
  createMovie('m12', 'You', 'Trending Now', 92, 2018, '18+', 4),
  createMovie('m13', 'The Diplomat', 'Trending Now', 91, 2023, '16+', 1),
  createMovie('m14', 'The Fall', 'Trending Now', 93, 2013, '18+', 3),
  createMovie('m15', 'Mindhunter', 'Trending Now', 96, 2017, '18+', 2),

  // Netflix Originals
  createMovie('m16', 'Daredevil', 'Netflix Originals', 94, 2015, '18+', 3),
  createMovie('m17', 'The Punisher', 'Netflix Originals', 93, 2017, '18+', 2),
  createMovie('m18', 'Jessica Jones', 'Netflix Originals', 91, 2015, '18+', 3),
  createMovie('m19', 'Luke Cage', 'Netflix Originals', 90, 2016, '18+', 2),
  createMovie('m20', 'Iron Fist', 'Netflix Originals', 85, 2017, '16+', 2),
  createMovie('m21', 'The Defenders', 'Netflix Originals', 89, 2017, '16+', 1),
  createMovie('m22', 'Godless', 'Netflix Originals', 92, 2017, '18+', 1),
  createMovie('m23', 'Marco Polo', 'Netflix Originals', 88, 2014, '18+', 2),
  createMovie('m24', 'Altered Carbon', 'Netflix Originals', 91, 2018, '18+', 2),
  createMovie('m25', 'Cyberpunk: Edgerunners', 'Netflix Originals', 95, 2022, '18+', 1),
  createMovie('m26', 'Arcane', 'Netflix Originals', 97, 2021, '16+', 2),
  createMovie('m27', 'Castlevania', 'Netflix Originals', 94, 2017, '18+', 4),
  createMovie('m28', 'Castlevania: Nocturne', 'Netflix Originals', 92, 2023, '18+', 1),
  createMovie('m29', 'Rebel Moon', 'Netflix Originals', 87, 2023, '16+'),
  createMovie('m30', 'The Platform', 'Netflix Originals', 90, 2019, '18+'),

  // Critically Acclaimed Dramas
  createMovie('m31', 'The Crown', 'Critically Acclaimed Dramas', 94, 2016, '16+', 6),
  createMovie('m32', 'Mindhunter', 'Critically Acclaimed Dramas', 96, 2017, '18+', 2),
  createMovie('m33', 'The Diplomat', 'Critically Acclaimed Dramas', 91, 2023, '16+', 1),
  createMovie('m34', 'Godless', 'Critically Acclaimed Dramas', 92, 2017, '18+', 1),
  createMovie('m35', 'Unbelievable', 'Critically Acclaimed Dramas', 94, 2019, '18+', 1),
  createMovie('m36', 'The Haunting of Hill House', 'Critically Acclaimed Dramas', 95, 2018, '18+', 1),
  createMovie('m37', 'The Haunting of Bly Manor', 'Critically Acclaimed Dramas', 93, 2020, '16+', 1),
  createMovie('m38', 'Ratched', 'Critically Acclaimed Dramas', 89, 2020, '18+', 1),
  createMovie('m39', 'Ozark', 'Critically Acclaimed Dramas', 95, 2017, '18+', 4),
  createMovie('m40', 'Breaking Bad', 'Critically Acclaimed Dramas', 98, 2008, '18+', 5),
  createMovie('m41', 'Better Call Saul', 'Critically Acclaimed Dramas', 97, 2015, '16+', 6),
  createMovie('m42', 'The Diplomat', 'Critically Acclaimed Dramas', 91, 2023, '16+', 1),
  createMovie('m43', 'Firefly Lane', 'Critically Acclaimed Dramas', 88, 2021, '16+', 2),
  createMovie('m44', 'Sweet Magnolias', 'Critically Acclaimed Dramas', 87, 2020, '13+', 3),

  // Thrilling Series & Movies
  createMovie('m45', 'Bird Box', 'Thrilling Series & Movies', 89, 2018, '16+'),
  createMovie('m46', 'You', 'Thrilling Series & Movies', 92, 2018, '18+', 4),
  createMovie('m47', 'The Fall', 'Thrilling Series & Movies', 93, 2013, '18+', 3),
  createMovie('m48', 'Bodyguard', 'Thrilling Series & Movies', 91, 2018, '16+', 1),
  createMovie('m49', 'The Watcher', 'Thrilling Series & Movies', 88, 2022, '18+', 1),
  createMovie('m50', 'Dahmer', 'Thrilling Series & Movies', 90, 2022, '18+', 1),
  createMovie('m51', 'The Midnight Club', 'Thrilling Series & Movies', 87, 2022, '16+', 1),
  createMovie('m52', 'Scream', 'Thrilling Series & Movies', 86, 2022, '18+'),
  createMovie('m53', 'Fear Street Trilogy', 'Thrilling Series & Movies', 89, 2021, '18+'),

  // Award-Winning Content
  createMovie('m54', 'The Crown', 'Award-Winning Content', 94, 2016, '16+', 6),
  createMovie('m55', 'The Queen\'s Gambit', 'Award-Winning Content', 96, 2020, '16+', 1),
  createMovie('m56', 'Beef', 'Award-Winning Content', 95, 2023, '18+', 1),
  createMovie('m57', 'Glass Onion', 'Award-Winning Content', 91, 2022, '13+'),
  createMovie('m58', 'Don\'t Look Up', 'Award-Winning Content', 88, 2021, '16+'),
  createMovie('m59', 'The Adam Project', 'Award-Winning Content', 87, 2022, '13+'),
  createMovie('m60', 'Red Notice', 'Award-Winning Content', 86, 2021, '13+'),
  createMovie('m61', 'Murder Mystery', 'Award-Winning Content', 85, 2019, '13+'),
  createMovie('m62', 'All of Us Are Dead', 'Award-Winning Content', 90, 2022, '18+', 1),

  // Documentaries & Reality
  createMovie('m63', 'Our Planet', 'Documentaries & Reality', 96, 2019, '7+', 1),
  createMovie('m64', 'The Last Dance', 'Documentaries & Reality', 97, 2020, '13+', 1),
  createMovie('m65', 'Fyre', 'Documentaries & Reality', 93, 2019, '16+'),
  createMovie('m66', 'Tiger King', 'Documentaries & Reality', 90, 2020, '18+', 2),
  createMovie('m67', 'The Social Dilemma', 'Documentaries & Reality', 91, 2020, '13+'),
  createMovie('m68', 'The Great British Baking Show', 'Documentaries & Reality', 89, 2010, '7+', 12),
  createMovie('m69', 'Cheer', 'Documentaries & Reality', 92, 2020, '16+', 2),
  createMovie('m70', 'Love is Blind', 'Documentaries & Reality', 86, 2020, '16+', 5),
  createMovie('m71', 'The Circle', 'Documentaries & Reality', 85, 2020, '13+', 5),

  // Epic Fantasy & Adventure
  createMovie('m72', 'House of the Dragon', 'Epic Fantasy & Adventure', 93, 2022, '18+', 2),
  createMovie('m73', 'The Witcher', 'Epic Fantasy & Adventure', 91, 2019, '18+', 3),
  createMovie('m74', 'The Last Kingdom', 'Epic Fantasy & Adventure', 92, 2015, '18+', 5),
  createMovie('m75', 'Vikings', 'Epic Fantasy & Adventure', 93, 2013, '18+', 6),
  createMovie('m76', 'Sandman', 'Epic Fantasy & Adventure', 90, 2022, '16+', 1),
  createMovie('m77', 'Shadow and Bone', 'Epic Fantasy & Adventure', 89, 2021, '16+', 2),

  // Medieval & Political Dramas
  createMovie('m78', 'Game of Thrones', 'Medieval & Political Dramas', 97, 2011, '18+', 8),
  createMovie('m79', 'House of the Dragon', 'Medieval & Political Dramas', 93, 2022, '18+', 2),
  createMovie('m80', 'The Crown', 'Medieval & Political Dramas', 94, 2016, '16+', 6),
  createMovie('m81', 'Vikings: Valhalla', 'Medieval & Political Dramas', 90, 2022, '18+', 2),
  createMovie('m82', 'Peaky Blinders', 'Medieval & Political Dramas', 95, 2013, '18+', 6),
  createMovie('m83', 'The Last Kingdom', 'Medieval & Political Dramas', 92, 2015, '18+', 5),

  // Fantasy & Sci-Fi Series
  createMovie('m84', 'Stranger Things', 'Fantasy & Sci-Fi Series', 96, 2016, '16+', 4),
  createMovie('m85', 'Dark', 'Fantasy & Sci-Fi Series', 97, 2017, '16+', 3),
  createMovie('m86', 'The Umbrella Academy', 'Fantasy & Sci-Fi Series', 91, 2019, '16+', 3),
  createMovie('m87', 'Altered Carbon', 'Fantasy & Sci-Fi Series', 91, 2018, '18+', 2),
  createMovie('m88', 'Arcane', 'Fantasy & Sci-Fi Series', 97, 2021, '16+', 2),
  createMovie('m89', 'Shadow and Bone', 'Fantasy & Sci-Fi Series', 89, 2021, '16+', 2),
  createMovie('m90', 'The OA', 'Fantasy & Sci-Fi Series', 90, 2016, '16+', 2),
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Trending Now', movies: moviesData.filter(m => m.category === 'Trending Now') },
  { id: 'cat2', name: 'Netflix Originals', movies: moviesData.filter(m => m.category === 'Netflix Originals') },
  { id: 'cat3', name: 'Critically Acclaimed Dramas', movies: moviesData.filter(m => m.category === 'Critically Acclaimed Dramas') },
  { id: 'cat4', name: 'Thrilling Series & Movies', movies: moviesData.filter(m => m.category === 'Thrilling Series & Movies') },
  { id: 'cat5', name: 'Award-Winning Content', movies: moviesData.filter(m => m.category === 'Award-Winning Content') },
  { id: 'cat6', name: 'Documentaries & Reality', movies: moviesData.filter(m => m.category === 'Documentaries & Reality') },
  { id: 'cat7', name: 'Epic Fantasy & Adventure', movies: moviesData.filter(m => m.category === 'Epic Fantasy & Adventure') },
  { id: 'cat8', name: 'Medieval & Political Dramas', movies: moviesData.filter(m => m.category === 'Medieval & Political Dramas') },
  { id: 'cat9', name: 'Fantasy & Sci-Fi Series', movies: moviesData.filter(m => m.category === 'Fantasy & Sci-Fi Series') },
];

export default moviesData;
