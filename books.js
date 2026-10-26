import {plots} from './plots.js';
const initial = [
 {id:'space',title:'The cosmic classroom',tag:'SPACE & SCIENCE',icon:'✦',color:'#deddf8',lesson:'Planets, stars & our Milky Way',description:'A small astronaut. A very big universe. Discover what makes our solar system so extraordinary.'},
 {id:'forest',title:'The whispering woods',tag:'NATURE & WONDER',icon:'❋',color:'#dce8d9',lesson:'Photosynthesis & caring for nature',description:'Follow a curious firefly into a forest where every leaf has a little science to share.'},
 {id:'ocean',title:'A sea of discoveries',tag:'OCEAN & ECOLOGY',icon:'≈',color:'#d9e9ef',lesson:'Ocean habitats & protecting wildlife',description:'Dive below the waves to meet reef neighbors and learn how little actions help our ocean.'}
];
const collection = [
['lantern','The Kingdom of Quiet Lanterns','magical kingdoms','A clockwork fox','Cooperation & light','A kingdom’s lanterns go dark; the smallest acts of kindness relight them.'],
['tide','The Island of Wandering Tides','enchanted seas','A mapmaking otter','Tides & belonging','An island drifts away because its people have stopped listening to one another.'],
['toys','The Midnight Mending Club','living toys','A patchwork badger','Repair & resourcefulness','Forgotten toys build a rescue machine from things everyone else discarded.'],
['dragon','The Dragon with a Paper Heart','dragons','A bashful baby dragon','Courage & air currents','A dragon afraid of heights discovers courage can mean asking for help.'],
['dream','The Atlas of Almost Dreams','dream worlds','A velvet moth','Emotions & empathy','Unfinished dreams become a map to a friend who thinks they do not matter.'],
['princess','The Princess and the Rain Library','princess adventures','A spectacled heron','Water cycle & leadership','A royal library stores rain in books, but someone has borrowed the final storm.'],
['prince','The Prince of the Upside-Down Orchard','enchanted castles','A moon rabbit','Gravity & fairness','An orchard grows into the sky while the castle forgets the village below.'],
['hero','The Cape That Could Listen','superheroes','A tiny rescue dog','Sound & compassion','A quiet hero hears a city’s worries before learning how to help.'],
['coral','The City Beneath the Pearl','underwater civilizations','A curious cuttlefish','Reefs & interdependence','A city’s pearl dims when its neighbors build walls between habitats.'],
['beast','The Council of Small Paws','talking animals','A bold field mouse','Habitats & advocacy','The smallest animals must persuade the forest council to change its plans.'],
['castle','The Castle with a Thousand Doors','enchanted castles','A polite stone gargoyle','Patterns & patience','Every door offers a shortcut except the one worth taking.'],
['cloud','The Cloudsmith’s Apprentice','sky kingdoms','A puffin with goggles','Weather & responsibility','An accidental snowstorm hides a village that needs warmth and friendship.'],
['star','The Last Star Post Office','space adventures','A comet-tailed ferret','Stars & connection','Undelivered letters lead to a lonely astronomer at the galaxy’s edge.'],
['garden','The Garden of Borrowed Colors','magical kingdoms','A paint-spotted snail','Pollination & generosity','A gray garden recovers its colors when its visitors learn to share.'],
['moon','The Moon’s Missing Lullaby','space adventures','A sleepy lunar hare','Moon phases & rest','A missing song reveals that even explorers need time to rest.'],
['snow','The Winter of Warm Whispers','princess adventures','A woolly snow finch','Insulation & kindness','A mountain celebration is saved by listening to a shy inventor.'],
['sand','The Sandglass Caravan','desert adventures','A long-eared desert fox','Adaptation & trust','A caravan follows a false oasis until an overlooked guide speaks up.'],
['clock','The Town That Misplaced Tomorrow','mystery','A copper beetle','Time & making choices','A town loses its tomorrow when everyone tries to undo yesterday.'],
['whale','The Whale Who Carried a Garden','ocean adventures','A singing whale calf','Migration & stewardship','A floating garden must find a home without displacing its wild neighbors.'],
['mountain','The Mountain of Tiny Brave Things','dragons','A miniature cliff dragon','Erosion & perseverance','A tiny dragon and a child find a gentler route through a crumbling pass.'],
['mirror','The Mirror Lake Mystery','dream worlds','A silver-feathered duck','Reflection & self-worth','A lake shows what people fear instead of who they are.'],
['train','The Starlight Seed Express','space adventures','A hedgehog conductor','Seed growth & hope','A train carrying seeds must bring a garden to a dark space station.'],
['music','The Valley of Unheard Songs','talking animals','A tone-deaf tree frog','Vibration & inclusion','A valley discovers that a beautiful chorus needs different voices.'],
['reef','The Little Guardians of Glass Reef','underwater civilizations','A helmet-wearing hermit crab','Ocean care & teamwork','A reef rescue succeeds when every creature brings a different skill.'],
['kite','The Royal Kite Rescue','prince adventures','A daring red panda','Wind & humility','A royal competition becomes a rescue when a rival needs help.'],
['shadow','The Superhero of Small Shadows','superheroes','A lantern-tailed gecko','Light & fear','A shadow monster turns out to be a misunderstood creature seeking shelter.'],
['memory','The Museum of Pocket Treasures','dream worlds','An absentminded raccoon','Memory & gratitude','Ordinary keepsakes reveal the extraordinary people behind them.']
];
export const adventures = [...initial,...collection.map(([id,title,category,companion,lesson,description],i)=>({id,title,category,companion,lesson,description,tag:category.toUpperCase(),icon:['✦','❋','≈','◇','☾'][i%5],color:['#deddf8','#dce8d9','#d9e9ef','#f1dfd6','#eee3bd'][i%5]}))];
export const roles=['magical explorer','princess','prince','superhero','animal guardian'];
export function story(name, age, adventure, options={}) {
 const a=adventures.find(a=>a.id===adventure);if(!a)throw Error('Unknown adventure');
 const role=roles.includes(options.role)?options.role:'magical explorer';
 const friend=a.companion||({space:'a curious robot fox',forest:'a lantern-carrying dormouse',ocean:'a cheerful sea otter'}[adventure]);
 const [setting,challenge,twist,resolution,fact]=plots[adventure];
 const beats=[
 ['A story just for you',options.dedication||`For ${name}, whose questions can open whole new worlds.`],
 ['An ordinary morning',`${name}, age ${age}, was practicing being a ${role}. It mostly involved a blanket cape and a very serious breakfast.`],
 ['Something impossible',`A folded map slipped under the door. It shimmered with a picture of ${setting}. “That was not here yesterday,” said ${name}.`],
 ['An unusual friend',`${name} met ${friend}. “I am an excellent guide,” the companion announced, walking straight into a flowerpot.`],
 ['The invitation',`${a.description} “Will you help?” the guide asked. ${name} felt a flutter of worry, then nodded.`],
 ['Across the threshold',`Together they arrived at ${setting}. They discovered ${challenge}. The map shimmered, then grew still.`],
 ['A promise',`${name} promised to bring everyone home safely.${options.sibling?` “We do this together,” said ${options.sibling}, taking ${name}’s hand.`:' The companion offered a small, steady paw.'}`],
 ['The first puzzle',`The path divided into three. The loudest sign said HURRY. The smallest sign said LOOK CLOSELY. ${name} chose to look.`],
 ['A discovery',fact],
 ['Try it together',`“How could we learn more?” asked ${name}. They drew what they saw in a notebook and compared their ideas.`],
 ['A helpful mistake',`The guide’s grand plan ended with a splash. ${name} laughed, then offered a hand. “Mistakes are clues, too.”`],
 ['The locked gate',`A gate would not open for strength or fancy words. It opened when ${name} asked the quietest traveler what they needed.`],
 ['The unexpected truth',`Beyond the gate came a surprise: ${twist}. “We have been asking the wrong question,” ${name} whispered.`],
 ['Listening first',`A worried local guide stepped forward. “I did not know what to do,” they whispered. ${name} sat beside them. “You do not have to figure it out alone.”`],
 ['The cost of a shortcut',`The map offered an easy way home—but it would leave their new friends behind. ${name} folded it shut.`],
 ['A small brave choice',`“I am scared,” ${name} admitted. The guide leaned closer. “Being brave does not mean you are never scared.”`],
 ['A plan for everyone',`They made a plan that used everyone’s strengths. The local guide knew the paths; the companion could reach small spaces; ${name} could bring them together.`],
 ['Learning becomes action',`${name} remembered the discovery: ${a.lesson.toLowerCase()}. They checked their idea carefully before trying the next step.`],
 ['When the lights went out',`Just as they began, the path darkened. For a moment, ${name} thought they had failed. Then a tiny voice said, “We are still here.”`],
 ['The heart of the adventure',`${name} reached for their new friend’s hand. “You belong with us, even when things go wrong.” Together, they took the next step.`],
 ['A world wakes up',`${name} and their friends ${resolution}. Neighbors cheered. The world had not needed one perfect hero; it had needed people willing to care.`],
 ['A joyful mess',`The guide attempted a victory bow, sneezed, and landed in a pile of ribbons. Even the worried guide laughed until their cheeks hurt.`],
 ['A promise kept',`${name} brought everyone home. The notebook now held a map, a discovery, and a reminder: kindness and curiosity can change what happens next.`],
 ['Your next discovery',`Back at home, ${name} tucked away the blanket cape. “What did you learn?” someone asked. ${name} smiled. “Let me tell you.” What brave, kind thing will you try tomorrow?`]
 ];
 return beats.map(([title,text],i)=>({number:i+1,title,text}));
}
export function assertTestKey(key){if(!key?.startsWith('sk_test_'))throw Error('Only Stripe test keys are permitted.');}
