import { Category, Episode, FeaturedTitle, Movie, MediaType } from '../types';

/**
 * Catalogue of titles that are free to stream legally.
 *
 * Every entry is either in the public domain or released under a Creative Commons
 * licence, and streams from the Internet Archive's embeddable player. Identifiers were
 * checked against archive.org; licences are as recorded on each archive.org item page.
 * Descriptions are written for this project.
 *
 * To add a title: find it on archive.org, confirm its licence on the item page, and add
 * an entry using the item identifier from the URL (archive.org/details/<identifier>).
 */

const ARCHIVE = 'https://archive.org';
const thumb = (archiveId: string) => `${ARCHIVE}/services/img/${encodeURIComponent(archiveId)}`;
const file = (archiveId: string, name: string) =>
  `${ARCHIVE}/download/${encodeURIComponent(archiveId)}/${encodeURIComponent(name)}`;

interface MovieInput {
  id: string;
  archiveId: string;
  title: string;
  category: string;
  genres: string[];
  year?: number;
  rating?: string;
  description: string;
  license?: string;
  credit?: string;
  posterUrl?: string;
}

function movie(input: MovieInput): Movie {
  return {
    id: input.id,
    title: input.title,
    description: input.description,
    imageUrl: thumb(input.archiveId),
    posterUrl: input.posterUrl,
    category: input.category,
    genres: input.genres,
    year: input.year,
    maturityRating: input.rating ?? '13+',
    type: 'movie',
    license: input.license ?? 'Public domain',
    credit: input.credit,
    source: { provider: 'archive', id: input.archiveId },
  };
}

interface SeriesInput extends Omit<MovieInput, 'archiveId'> {
  episodes: Array<[archiveId: string, title: string]>;
}

function series(input: SeriesInput): Movie {
  const episodes: Episode[] = input.episodes.map(([archiveId, title], index) => ({
    id: `${input.id}-e${index + 1}`,
    title,
    source: { provider: 'archive', id: archiveId },
  }));
  return {
    id: input.id,
    title: input.title,
    description: input.description,
    imageUrl: thumb(input.episodes[0][0]),
    category: input.category,
    genres: input.genres,
    year: input.year,
    maturityRating: input.rating ?? '7+',
    type: 'series' as MediaType,
    license: input.license ?? 'Public domain',
    episodes,
  };
}

const BLENDER_CREDIT = '© Blender Foundation | www.blender.org — licensed CC BY 3.0';

const moviesData: Movie[] = [
  // ---------- Open Movies (Creative Commons) ----------
  movie({
    id: 'sintel', archiveId: 'Sintel', title: 'Sintel', category: 'Open Movies',
    genres: ['Fantasy', 'Adventure', 'Animation'], year: 2010, rating: '13+',
    license: 'CC BY 3.0', credit: BLENDER_CREDIT, posterUrl: file('Sintel', 'Poster.jpg'),
    description: 'A lone young woman crosses snowbound mountains and sprawling markets in search of the baby dragon she once rescued, and learns too late what the search has cost her.',
  }),
  movie({
    id: 'tears-of-steel', archiveId: 'Tears-of-Steel', title: 'Tears of Steel', category: 'Open Movies',
    genres: ['Sci-Fi', 'Action'], year: 2012, rating: '13+',
    license: 'CC BY 3.0', credit: BLENDER_CREDIT, posterUrl: file('Tears-of-Steel', 'tos-poster.jpg'),
    description: 'In a future Amsterdam overrun by robots, a band of scientists stages a last-ditch experiment to rewrite a painful breakup that set the machines in motion.',
  }),
  movie({
    id: 'big-buck-bunny', archiveId: 'BigBuckBunny_124', title: 'Big Buck Bunny', category: 'Open Movies',
    genres: ['Comedy', 'Animation', 'Family'], year: 2008, rating: 'All',
    license: 'CC BY 3.0', credit: BLENDER_CREDIT,
    description: 'A gentle giant of a rabbit has had enough of three woodland bullies, and plots an elaborate, slapstick revenge.',
  }),
  movie({
    id: 'elephants-dream', archiveId: 'ElephantsDream', title: 'Elephants Dream', category: 'Open Movies',
    genres: ['Sci-Fi', 'Animation', 'Surreal'], year: 2006, rating: '7+',
    license: 'CC BY 3.0', credit: BLENDER_CREDIT,
    description: 'Two men explore an endless, shifting machine-world — one convinced he built it, the other beginning to doubt it exists at all.',
  }),
  movie({
    id: 'sita-sings-the-blues', archiveId: 'Sita_Sings_the_Blues', title: 'Sita Sings the Blues', category: 'Open Movies',
    genres: ['Animation', 'Musical', 'Romance'], year: 2008, rating: '13+',
    license: 'CC0 (public domain dedication)', credit: 'By Nina Paley',
    description: 'An ancient Indian epic and a modern breakup are retold side by side in a hand-animated musical, set to 1920s jazz recordings.',
  }),
  movie({
    id: 'star-wreck', archiveId: 'StarWreckInThePirkining', title: 'Star Wreck: In the Pirkining', category: 'Open Movies',
    genres: ['Sci-Fi', 'Comedy', 'Parody'], year: 2005, rating: '13+',
    license: 'CC BY-SA 3.0', credit: 'Star Wreck Studios',
    description: 'A fan-made Finnish space comedy in which a hapless starship captain stumbles into an interdimensional war.',
  }),

  // ---------- Classic Horror ----------
  movie({
    id: 'night-of-the-living-dead', archiveId: 'Night.Of.The.Living.Dead_1080p', title: 'Night of the Living Dead',
    category: 'Classic Horror', genres: ['Horror', 'Thriller'], year: 1968, rating: '16+',
    description: 'Strangers barricade themselves inside a rural farmhouse as the recently dead rise and close in — the low-budget film that invented the modern zombie.',
  }),
  movie({
    id: 'house-on-haunted-hill', archiveId: 'house_on_haunted_hill_ipod', title: 'House on Haunted Hill',
    category: 'Classic Horror', genres: ['Horror', 'Mystery'], year: 1959, rating: '13+',
    description: 'An eccentric millionaire offers five guests a fortune to survive one night locked in a house with a murderous past.',
  }),
  movie({
    id: 'carnival-of-souls', archiveId: 'CarnivalofSouls', title: 'Carnival of Souls',
    category: 'Classic Horror', genres: ['Horror', 'Psychological'], year: 1962, rating: '13+',
    description: 'After surviving a car accident, a church organist is drawn toward an abandoned lakeside pavilion and the pale figures who seem to be waiting for her.',
  }),
  movie({
    id: 'cabinet-of-dr-caligari', archiveId: 'DasKabinettdesDoktorCaligariTheCabinetofDrCaligari', title: 'The Cabinet of Dr. Caligari',
    category: 'Classic Horror', genres: ['Horror', 'Silent', 'Expressionist'], year: 1919, rating: '13+',
    description: 'A fairground hypnotist and his sleepwalking servant are linked to a string of murders in a town built of jagged, painted shadows.',
  }),
  movie({
    id: 'phantom-of-the-opera', archiveId: 'ThePhantomoftheOpera', title: 'The Phantom of the Opera',
    category: 'Classic Horror', genres: ['Horror', 'Silent', 'Drama'], year: 1925, rating: '13+',
    description: 'A masked figure haunting the Paris Opera House becomes obsessed with a young singer and will do anything to make her a star.',
  }),
  movie({
    id: 'white-zombie', archiveId: 'white_zombie', title: 'White Zombie',
    category: 'Classic Horror', genres: ['Horror'], year: 1932, rating: '13+',
    description: 'On a Haitian plantation, a jealous suitor turns to a sinister mill owner who commands an army of the walking dead.',
  }),
  movie({
    id: 'haxan', archiveId: 'Haxan_tinted_and_subtitled', title: 'Häxan',
    category: 'Classic Horror', genres: ['Horror', 'Silent', 'Documentary'], year: 1922, rating: '16+',
    description: 'Part essay, part nightmare: a startling Scandinavian silent film exploring centuries of witchcraft, superstition and persecution.',
  }),
  movie({
    id: 'horror-hotel', archiveId: 'Horror_Hotel', title: 'City of the Dead (Horror Hotel)',
    category: 'Classic Horror', genres: ['Horror', 'Occult'], year: 1960, rating: '13+',
    description: 'A student researching witchcraft travels to a fog-bound New England village where an old curse is still very much alive.',
  }),

  // ---------- Film Noir & Crime ----------
  movie({
    id: 'detour', archiveId: 'Detour', title: 'Detour',
    category: 'Film Noir & Crime', genres: ['Noir', 'Crime'], year: 1945, rating: '13+',
    description: 'A nightclub pianist hitchhiking to Los Angeles makes one bad decision on the road, and fate never lets him take it back.',
  }),
  movie({
    id: 'scarlet-street', archiveId: 'ScarletStreet', title: 'Scarlet Street',
    category: 'Film Noir & Crime', genres: ['Noir', 'Drama'], year: 1945, rating: '13+',
    description: 'A meek cashier and amateur painter falls for a woman who sees him only as an easy mark — until the con spirals out of control.',
  }),
  movie({
    id: 'the-stranger', archiveId: 'TheStranger_0', title: 'The Stranger',
    category: 'Film Noir & Crime', genres: ['Noir', 'Thriller'], year: 1946, rating: '13+',
    description: 'A war-crimes investigator tracks a fugitive to a quiet Connecticut town, where the man has remade himself as a respected teacher.',
  }),
  movie({
    id: 'the-hitch-hiker', archiveId: 'Hitch_Hiker', title: 'The Hitch-Hiker',
    category: 'Film Noir & Crime', genres: ['Noir', 'Thriller'], year: 1953, rating: '13+',
    description: 'Two friends on a fishing trip pick up a stranger who turns out to be a killer, and are forced to drive him across the Mexican desert.',
  }),
  movie({
    id: 'suddenly', archiveId: 'suddenly', title: 'Suddenly',
    category: 'Film Noir & Crime', genres: ['Crime', 'Thriller'], year: 1954, rating: '13+',
    description: 'Hired gunmen take over a hilltop house in a sleepy town to ambush the President when his train passes through.',
  }),
  movie({
    id: 'impact', archiveId: 'impact', title: 'Impact',
    category: 'Film Noir & Crime', genres: ['Noir', 'Drama'], year: 1949, rating: '13+',
    description: 'A businessman survives his wife’s plot to kill him, starts a new life under another name, then learns he is wanted for his own murder.',
  }),
  movie({
    id: 'quicksand', archiveId: 'Quicksand_clear', title: 'Quicksand',
    category: 'Film Noir & Crime', genres: ['Noir', 'Crime'], year: 1950, rating: '13+',
    description: 'A garage mechanic “borrows” twenty dollars from the till to impress a date, and every attempt to cover it up sinks him deeper.',
  }),

  // ---------- Comedy Classics ----------
  movie({
    id: 'his-girl-friday', archiveId: 'his_girl_friday', title: 'His Girl Friday',
    category: 'Comedy Classics', genres: ['Comedy', 'Romance'], year: 1940, rating: '7+',
    description: 'A fast-talking newspaper editor will stop at nothing — including sabotaging her engagement — to win back his star reporter and ex-wife.',
  }),
  movie({
    id: 'my-favorite-brunette', archiveId: 'my_favorite_brunette', title: 'My Favorite Brunette',
    category: 'Comedy Classics', genres: ['Comedy', 'Mystery'], year: 1947, rating: '7+',
    description: 'A baby photographer who dreams of being a private eye gets his wish when a mysterious woman pulls him into a murder plot.',
  }),
  movie({
    id: 'the-flying-deuces', archiveId: 'TheFlyingDeuces', title: 'The Flying Deuces',
    category: 'Comedy Classics', genres: ['Comedy'], year: 1939, rating: 'All',
    description: 'Heartbroken in Paris, a famous comedy duo joins the French Foreign Legion and promptly makes a mess of it.',
  }),
  movie({
    id: 'africa-screams', archiveId: 'AfricaScreams', title: 'Africa Screams',
    category: 'Comedy Classics', genres: ['Comedy', 'Adventure'], year: 1949, rating: 'All',
    description: 'A department-store clerk bluffs his way onto a safari as an expert guide, with predictably chaotic results.',
  }),
  movie({
    id: 'meet-john-doe', archiveId: 'meet_john_doe', title: 'Meet John Doe',
    category: 'Comedy Classics', genres: ['Comedy', 'Drama'], year: 1941, rating: '7+',
    description: 'A columnist invents a fake protest letter, then hires a drifter to play its author — and a national movement takes on a life of its own.',
  }),
  movie({
    id: 'royal-wedding', archiveId: 'royal_wedding', title: 'Royal Wedding',
    category: 'Comedy Classics', genres: ['Musical', 'Romance'], year: 1951, rating: 'All',
    description: 'A brother-and-sister song-and-dance act takes their show to London during a royal wedding and both fall in love along the way.',
  }),

  // ---------- Silent Era ----------
  movie({
    id: 'the-pawnshop', archiveId: 'CC_1916_10_02_ThePawnshop', title: 'The Pawnshop',
    category: 'Silent Era', genres: ['Comedy', 'Silent', 'Short'], year: 1916, rating: 'All',
    description: 'A pawnbroker’s assistant wreaks havoc on the shop, his coworker and one very unlucky alarm clock.',
  }),
  movie({
    id: 'the-count', archiveId: 'CC_1916_09_04_TheCount', title: 'The Count',
    category: 'Silent Era', genres: ['Comedy', 'Silent', 'Short'], year: 1916, rating: 'All',
    description: 'A fired tailor’s apprentice crashes a high-society party disguised as nobility.',
  }),
  movie({
    id: 'the-rink', archiveId: 'CC_1916_12_04_TheRink', title: 'The Rink',
    category: 'Silent Era', genres: ['Comedy', 'Silent', 'Short'], year: 1916, rating: 'All',
    description: 'A clumsy waiter turns out to be an extraordinary roller skater, and the rink will never be the same.',
  }),
  movie({
    id: 'battleship-potemkin', archiveId: 'BattleshipPotemkin', title: 'Battleship Potemkin',
    category: 'Silent Era', genres: ['Drama', 'Silent', 'History'], year: 1925, rating: '13+',
    description: 'Sailors mutiny over rotten rations, sparking an uprising in Odessa — a landmark of film editing.',
  }),
  movie({
    id: 'the-lost-world', archiveId: 'lost_world', title: 'The Lost World',
    category: 'Silent Era', genres: ['Adventure', 'Silent', 'Fantasy'], year: 1925, rating: 'All',
    description: 'An expedition to a remote South American plateau discovers dinosaurs still roaming — and brings one home to London.',
  }),
  movie({
    id: '20000-leagues', archiveId: '20000LeaguesUndertheSea', title: '20,000 Leagues Under the Sea',
    category: 'Silent Era', genres: ['Adventure', 'Silent', 'Sci-Fi'], year: 1916, rating: 'All',
    description: 'The mysterious Captain Nemo and his submarine Nautilus, filmed with pioneering underwater photography.',
  }),

  // ---------- Adventure & Westerns ----------
  movie({
    id: 'mclintock', archiveId: 'mclintok_widescreen', title: 'McLintock!',
    category: 'Adventure & Westerns', genres: ['Western', 'Comedy'], year: 1963, rating: '7+',
    description: 'A cattle baron juggles land disputes, a rebellious daughter and the sudden return of his estranged wife.',
  }),
  movie({
    id: 'angel-and-the-badman', archiveId: 'angel_and_the_badman', title: 'Angel and the Badman',
    category: 'Adventure & Westerns', genres: ['Western', 'Romance'], year: 1947, rating: '7+',
    description: 'A wounded gunslinger is nursed back to health by a Quaker family, and starts to question the life he left behind.',
  }),
  movie({
    id: 'the-most-dangerous-game', archiveId: 'TheMostDangerousGame', title: 'The Most Dangerous Game',
    category: 'Adventure & Westerns', genres: ['Adventure', 'Thriller'], year: 1932, rating: '13+',
    description: 'Shipwrecked on a remote island, a big-game hunter discovers his host hunts a far more dangerous kind of prey.',
  }),
  movie({
    id: 'captain-kidd', archiveId: 'CaptainKidd_', title: 'Captain Kidd',
    category: 'Adventure & Westerns', genres: ['Adventure', 'Pirates'], year: 1945, rating: '7+',
    description: 'The notorious pirate talks his way into royal favour, planning to escort a treasure ship and steal it for himself.',
  }),
  movie({
    id: 'jungle-book', archiveId: 'JungleBook', title: 'Jungle Book',
    category: 'Adventure & Westerns', genres: ['Adventure', 'Fantasy', 'Family'], year: 1942, rating: 'All',
    description: 'A boy raised by wolves returns to his village and is caught between the jungle and the greed of men.',
  }),
  movie({
    id: 'gullivers-travels', archiveId: 'gullivers_travels1939', title: "Gulliver's Travels",
    category: 'Adventure & Westerns', genres: ['Animation', 'Family', 'Musical'], year: 1939, rating: 'All',
    description: 'A shipwrecked sailor wakes up as a giant among the tiny, squabbling people of Lilliput in this hand-drawn animated feature.',
  }),

  // ---------- Retro Sci-Fi ----------
  movie({
    id: 'killers-from-space', archiveId: 'Killers_from_space', title: 'Killers from Space',
    category: 'Retro Sci-Fi', genres: ['Sci-Fi'], year: 1954, rating: '7+',
    description: 'A nuclear scientist survives a plane crash with no memory of what happened — except for bug-eyed aliens planning an invasion.',
  }),
  movie({
    id: 'teenagers-from-outer-space', archiveId: 'teenagers_from_outerspace', title: 'Teenagers from Outer Space',
    category: 'Retro Sci-Fi', genres: ['Sci-Fi', 'Horror'], year: 1959, rating: '7+',
    description: 'Young aliens land on Earth to breed giant monsters as livestock, but one of them has second thoughts.',
  }),
  movie({
    id: 'voyage-prehistoric-women', archiveId: 'VoyagetothePlanetofPrehistoricWomen', title: 'Voyage to the Planet of Prehistoric Women',
    category: 'Retro Sci-Fi', genres: ['Sci-Fi', 'Adventure'], year: 1968, rating: '7+',
    description: 'Astronauts stranded on Venus face dinosaurs, a robot companion and a tribe of islanders who worship a pterodactyl god.',
  }),
  movie({
    id: 'planet-outlaws', archiveId: 'planet_outlaws_ipod', title: 'Planet Outlaws',
    category: 'Retro Sci-Fi', genres: ['Sci-Fi', 'Serial'], year: 1953, rating: 'All',
    description: 'A 20th-century pilot wakes five centuries in the future and joins the fight against a ruthless space tyrant.',
  }),

  // ---------- Classic TV Series ----------
  series({
    id: 'beverly-hillbillies', title: 'The Beverly Hillbillies', category: 'Classic TV',
    genres: ['Sitcom', 'Comedy'], year: 1962,
    description: 'A backwoods family strikes oil and moves into a Beverly Hills mansion, baffling their neighbours and their banker.',
    episodes: [
      ['Beverly_Hillbillies_Ep01_The_Clampetts_Strike_Oil', 'The Clampetts Strike Oil'],
      ['Beverly_Hillbillies_Ep02_Getting_Settled', 'Getting Settled'],
      ['Beverly_Hillbillies_Ep06_Trick_Or_Treat', 'Trick or Treat'],
      ['Beverly_Hillbillies_Ep07_The_Servants', 'The Servants'],
      ['Beverly_Hillbillies_Ep13_Home_For_Christmas', 'Home for Christmas'],
    ],
  }),
  series({
    id: 'sherlock-holmes-1954', title: 'Sherlock Holmes (1954)', category: 'Classic TV',
    genres: ['Mystery', 'Crime'], year: 1954, rating: '7+',
    description: 'The great detective and Dr. Watson take on new cases in this half-hour series shot in France.',
    episodes: [
      ['SherlockHolmes-TheCaseoftheShyBallerina', 'The Case of the Shy Ballerina'],
      ['SherlockHolmes-TheCaseofLadyBeryl', 'The Case of Lady Beryl'],
      ['SherlockHolmes-TheCaseoftheCunninghamHeritage', 'The Case of the Cunningham Heritage'],
    ],
  }),
  series({
    id: 'tales-of-tomorrow', title: 'Tales of Tomorrow', category: 'Classic TV',
    genres: ['Sci-Fi', 'Anthology'], year: 1951, rating: '7+',
    description: 'Live television science fiction: each episode is a standalone story of strange discoveries and futures gone wrong.',
    episodes: [
      ['TalesOfTomorrow-IceFromSpace', 'Ice from Space'],
      ['Tales_Of_Tomorrow_-_Ahead_Of_His_Time', 'Ahead of His Time'],
    ],
  }),
  series({
    id: 'bonanza', title: 'Bonanza', category: 'Classic TV',
    genres: ['Western', 'Drama'], year: 1959,
    description: 'A widowed rancher and his three very different sons defend their sprawling Nevada spread.',
    episodes: [
      ['Bonanza-DeathOnSunMountain', 'Death on Sun Mountain'],
      ['Bonanza_pd', 'Public domain episode collection'],
    ],
  }),
  series({
    id: 'the-lone-ranger', title: 'The Lone Ranger', category: 'Classic TV',
    genres: ['Western', 'Action'], year: 1949,
    description: 'A masked former Texas Ranger and his companion ride the frontier bringing outlaws to justice.',
    episodes: [
      ['enter_the_lone_ranger', 'Enter the Lone Ranger'],
      ['theloneranger_201705', 'Episode collection'],
    ],
  }),
  series({
    id: 'dragnet', title: 'Dragnet', category: 'Classic TV',
    genres: ['Crime', 'Police'], year: 1951, rating: '7+',
    description: 'Just the facts: a Los Angeles police sergeant works cases step by methodical step.',
    episodes: [
      ['Dragnet_A_Gun_For_Christmas', 'A Gun for Christmas'],
      ['DragnetEpisode18TheBigSeventeenwcommercials', 'The Big Seventeen'],
    ],
  }),
];

const CATEGORY_ORDER = [
  'Open Movies',
  'Classic Horror',
  'Classic TV',
  'Film Noir & Crime',
  'Comedy Classics',
  'Silent Era',
  'Adventure & Westerns',
  'Retro Sci-Fi',
];

const slug = (name: string) => name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const categories: Category[] = CATEGORY_ORDER.map((name) => ({
  id: slug(name),
  name,
  movies: moviesData.filter((m) => m.category === name),
}));

const FEATURED: Array<{ id: string; tagline: string }> = [
  { id: 'sintel', tagline: 'Free to watch, forever' },
  { id: 'tears-of-steel', tagline: 'An open movie from Blender' },
];

export const featured: FeaturedTitle[] = FEATURED.map(({ id, tagline }) => {
  const title = moviesData.find((m) => m.id === id);
  if (!title) throw new Error(`Featured title "${id}" is not in the catalogue`);
  return { ...title, tagline };
});

export default moviesData;
