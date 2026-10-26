import {plots} from './plots.js';
import {catalog,catalogOrder,filterGroups} from './catalog.js';
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
['castle','The Castle with a Thousand Doors','enchanted castles','A courteous stone owl','Patterns & patience','Every door offers a shortcut except the one worth taking.'],
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
['music','The Valley of Unheard Songs','talking animals','An enthusiastic tree frog','Vibration & inclusion','A valley discovers that a beautiful chorus needs different voices.'],
['reef','The Little Guardians of Glass Reef','underwater civilizations','A helmet-wearing hermit crab','Ocean care & teamwork','A reef rescue succeeds when every creature brings a different skill.'],
['kite','The Royal Kite Rescue','prince adventures','A daring red panda','Wind & humility','A royal competition becomes a rescue when a rival needs help.'],
['bridge','A Little Bridge, a Big Difference','superheroes','A friendly gecko','Structures & helpfulness','A child tests bridge designs to help a community garden.'],
['memory','The Museum of Pocket Treasures','dream worlds','An absentminded raccoon','Memory & gratitude','Ordinary keepsakes reveal the extraordinary people behind them.']
];
const baseAdventures = [...initial,...collection.map(([id,title,category,companion,lesson,description],i)=>({id,title,category,companion,lesson,description,tag:category.toUpperCase(),icon:['✦','❋','≈','◇','☾'][i%5],color:['#deddf8','#dce8d9','#d9e9ef','#f1dfd6','#eee3bd'][i%5]}))];
export const adventures=baseAdventures.map(a=>{const copy=catalog[a.id],index=catalogOrder.indexOf(a.id);return {...a,...copy,filters:Object.keys(filterGroups).filter(group=>filterGroups[group].includes(a.id)),lesson:copy.lessons[0],reflect:`How could you use what you learned in ${copy.title.toLowerCase()} to help someone or investigate a question of your own?`,image:`/images/adventures-${Math.floor(index/6)+1}.webp`,imageColumn:index%3,imageRow:Math.floor(index%6/3),imageAlt:`Storybook illustration for ${copy.title}: ${copy.lessons[0]}`};});
export const roles=['magical explorer','princess','prince','superhero','animal guardian'];
export function story(name, age, adventure, options={}) {
 const a=adventures.find(a=>a.id===adventure);if(!a)throw Error('Unknown adventure');
 const role=roles.includes(options.role)?options.role:'magical explorer';
 const friend=a.companion||({space:'a curious robot fox',forest:'a lantern-carrying dormouse',ocean:'a cheerful sea otter'}[adventure]);
 const [setting,challenge,twist,resolution,fact]=plots[adventure];
 const beats=[
 ['A story just for you',options.dedication||`For ${name}, whose questions can open whole new worlds.`],
 ['An ordinary morning',`${name}, age ${age}, was practicing being a ${role}. It mostly involved a blanket cape and a very serious breakfast.`],
 ['An invitation to investigate',`${name} received an invitation to visit ${setting}. A fresh notebook waited by the door. “What will we discover?” ${name} wondered.`],
 ['An unusual friend',`${name} met ${friend}. “I have brought three pencils,” the companion announced. “And no paper.” Luckily, ${name} had a notebook.`],
 ['A useful mission',`${name} learned about ${challenge}. “Before we rush in, let’s understand what is happening,” ${name} said.`],
 ['Across the threshold',`Together they arrived at ${setting}. They discovered ${challenge}. They opened their notebook and began with a question.`],
 ['A promise',`${name} promised to bring everyone home safely.${options.sibling?` “We do this together,” said ${options.sibling}, taking ${name}’s hand.`:' The companion offered a small, steady paw.'}`],
 ['The first attempt',a.activity[0].replaceAll('your child',name).replaceAll('Your child',name)],
 ['A discovery',fact],
 ['Try it together',a.activity[1].replaceAll('your child',name).replaceAll('Your child',name)],
 ['A useful notebook',`${name} wrote down what they had tried and what happened. The guide drew an enormous star beside the observation. “A star is not a measurement,” ${name} laughed, adding a clear note.`],
 ['Listen before deciding',`${name} asked, “Who is affected by our plan? What have we missed?” Together, they compared what they had observed with what their neighbors needed.`],
 ['The unexpected truth',`Beyond the gate came a surprise: ${twist}. “We have been asking the wrong question,” ${name} whispered.`],
 ['Listening first',`A worried local guide stepped forward. “I did not know what to do,” they whispered. ${name} sat beside them. “You do not have to figure it out alone.”`],
 ['The tempting shortcut',`“We could say it is finished,” the guide suggested. ${name} shook their head. “We have learned something, but we still need to check whether our idea helps.”`],
 ['A small brave choice',`“I thought I already knew the answer,” ${name} admitted. The guide smiled. “Changing your mind when you learn something is a strong thing to do.”`],
 ['A plan for everyone',`They made a plan that used everyone’s strengths. One friend checked observations, another recorded details, and ${name} made sure they all understood the question.`],
 ['Learning becomes action',a.activity[2].replaceAll('your child',name).replaceAll('Your child',name)],
 ['Check the result',`${name} stopped to check: had their plan helped, and had it caused a new problem? They asked for feedback rather than deciding that a finished job must be a successful one.`],
 ['The heart of the adventure',`${name} made sure everyone had a chance to speak. “You belong with us, even when your idea is different.” They listened, made a final adjustment, and agreed on what to do next.`],
 ['A world wakes up',`${name} and their friends ${resolution}. Neighbors cheered. The world had not needed one perfect hero; it had needed people willing to care.`],
 ['A joyful mess',`The guide attempted a victory bow, sneezed, and landed in a pile of ribbons. Even the worried guide laughed until their cheeks hurt.`],
 ['A promise kept',`${name} brought everyone home. The notebook now held a map, a discovery, and a reminder: kindness and curiosity can change what happens next.`],
 ['Your next discovery',`Back at home, ${name} opened the notebook. “Here is what we learned: ${a.lessons[0]}” Then came a question for you: ${a.reflect}`]
 ];
 return beats.map(([title,text],i)=>({number:i+1,title,text}));
}
export function assertTestKey(key){if(!key?.startsWith('sk_test_'))throw Error('Only Stripe test keys are permitted.');}
