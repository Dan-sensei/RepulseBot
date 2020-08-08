const config = require('./config.json');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const bot = new Discord.Client({disableEveryone: true});

// DE AQUI PABAJO PUEDES EDITAR COSAS ==========================================================================
// IDs

const SERVER_ID 		= '265204990455316492';
const ALERT_CHANNEL_ID 	= '719103654908395530';

const HMS = '719104448089161778';
const IJN = '719104540917366826';
const USS = '719104274524799088';
const KMS = '719104614162628678';
const DGN = '719105046633250886';


const SERVERS = ["amagi", "avrora", "lexington", "sandy", "washington"];
const FACTIONS = ["hms", "uss", "ijn", "kms", "dgn"];
const FACTION2DATA = 
{
	"hms": { Fullname: "Royal Navy", 	RoleID: HMS, Color: 15128575, 	Banner: "https://cdn.discordapp.com/attachments/456503841060421634/715072251195555930/Royal_Navy.png" },
	"uss": { Fullname: "Eagle Union", 	RoleID: USS, Color: 7193589, 	Banner: "https://cdn.discordapp.com/attachments/456503841060421634/715072248096096276/Eagle_Union.png" },
	"ijn": { Fullname: "Sakura Empire", RoleID: IJN, Color: 14064895, 	Banner: "https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png" },
	"kms": { Fullname: "Ironblood", 	RoleID: KMS, Color: 16758435, 	Banner: "https://cdn.discordapp.com/attachments/456503841060421634/715072249803309086/Ironblood.png" },
	"dgn": { Fullname: "DGNrados", 	RoleID: DGN, Color: 7077768, 	Banner: "https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png" },
}

// Tiempo que tarda Repulse en madarte a la mierda por lento
const RESPONSE_TIME_SECONDS = 60;

// MESSAGES
const KICK = 'https://cdn.discordapp.com/attachments/709111440665214987/709496458692526201/ezgif.com-resize.png';

const HELP_M = `https://cdn.discordapp.com/attachments/676881737262956546/740912326814728262/Spaces_Aurora_Noctis.jpg`;

const NOMBRE_M 				= '¿Cuál es tu nombre en el juego?';
const UID_M 				= '¿Cuál es tu UID en el juego?';
const UID_ERROR_M			= 'No introduzcas valores no numéricos!\nVuelve a empezar!\n' + KICK;
const SERVER_M 				= '¿En qué servidor juegas?```amagi avrora lexington sandy washington```';
const SERVER_ERROR_M 		= 'Ese servidor no existe!\nLos servidores disponibles son:\n```amagi avrora lexington sandy washington```\nVuelve a empezar!\n' + KICK;
const FACTION_M 			= '¿A qué facción apoyas?```HMS USS IJN KMS DGN```';
const FACTION_ERROR_M 		= 'Esa facción no existe!, las facciones disponibles son:\n```HMS USS IJN KMS DGN```\nVuelve a empezar!\n' + KICK;
const POINTS_M 				= '¿Cuántos puntos tienes? Ej: 62500';
const POINTS_ERROR_M 		= 'No has introducido un número! ＼| ￣ヘ￣|／\nVuelve a empezar!\n' + KICK;
const POINTS_LESS_THAN_0_M 	= 'No pongas números negativos! (╬ Ò ‸ Ó)\nVuelve a empezar!\n' + KICK;
const POINTS_PICTURE_M 		= 'Por último, envíame una screenshot donde se vean los puntos en formato JPG/PNG';
const POINTS_PICTURE_FORMAT = 'Sólo JPG o PNG!\nVuelve a empezar!\n' + KICK;

const REGISTRO_COMPLETADO_M = 'Registro completado! Tu participación ha sido guardada! Ｏ(≧▽≦)Ｏ';
const REGISTRO_ERROR_M 		= 'Parece que ha habido un problema al intentar guardar tus datos ~(>_<~).\nVuelve a intentarlo en unos minutos, si el problema persiste, ponte en contacto con Space.';

const ALREADY_REGISTERED	= 'Ya estás registrado!\nSi te has equivocado con algún dato contacta con algún moderador.';

const ROL_ASSIGN_SUCCESS_M1 = 'Además, te he asignado el rol ';
// Aquí va la facción que ha elegido, que no puedo saberla de antemano (Royal Navy best facción)
const ROL_ASSIGN_SUCCESS_M2 = ' en el servidor, ve a verlo!\nSi aún no tienes el rol en el servidor contacta con un moderador para que te lo asigne manualmente';
const ROL_ASSIGN_ERROR_M 	= 'Aunque parece que ha habido un problema al asignarte el rol de tu facción, contacta con algún moderador!';

const TIMEOUT = '\nVaya! Parece que has tardado demasiado en responder. Para reintentar el registro, escribe el comando "!registro" de nuevo en este chat ^_^';
const TIMEOUT2 = '\nVaya! Parece que has tardado demasiado en responder. Para volver a intentarlo, escribe el comando "!puntos" de nuevo en este chat ^_^';

const PTS_END_M = '¿Cuántos puntos tienes?';
const PTS_END__IMAGE_M = 'Para terminar, envíame una captura dónde se vean los puntos';
const MSG_END = 'Datos guardados!\n';
const MSG_END_ERROR = 'Parece que ha habido un problema al intentar guardar tus datos ~(>_<~).\nVuelve a intentarlo en unos minutos, si el problema persiste, ponte en contacto con Espeis.';

// DE AQUI PABAJO NO TOQUES NADA ===============================================================================

const RESPONSE_TIME = RESPONSE_TIME_SECONDS * 1000;

var serviceAccount = require("./serviceAccount.json");


let firebase = require('firebase-admin');
require('firebase/app');
require('firebase/auth');
require('firebase/database');

var firebaseConfig = {
	credential: firebase.credential.cert(serviceAccount),
	apiKey: "AIzaSyCQwa2zMFrHq3MV1qFrXbZ7Q5yKoIvLK1I",
	authDomain: "winter-s-crown.firebaseapp.com",
	databaseURL: "https://winter-s-crown.firebaseio.com",
	projectId: "winter-s-crown",
	storageBucket: "winter-s-crown.appspot.com",
	messagingSenderId: "964000776884",
	appId: "1:964000776884:web:69c727e990d6c0d6088de1",
	measurementId: "G-GLFRMKYGLJ"
};

firebase.initializeApp(firebaseConfig);


bot.on('ready', () => {
	console.log('NERATE POM!');
	bot.user.setActivity("!help");
});

bot.on('message', msg=>{
	if(msg.channel.type !== "dm") return;

	let prefix = config.prefix;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	if(cmd === `${prefix}help`){
		return msg.channel.send(HELP_M);
	}

	/*
	if(cmd === `${prefix}purga`) {
		
		const guild = bot.guilds.resolve(SERVER_ID);

		
		guild.roles.resolve(HMS).members.forEach(
			e => e.roles.remove(HMS).then(console.log("HMS borrado"))
		);
		guild.roles.resolve(IJN).members.forEach(
			e => e.roles.remove(IJN).then(console.log("IJN borrado"))
		);
		guild.roles.resolve(KMS).members.forEach(
			e => e.roles.remove(KMS).then(console.log("KMS borrado"))
		);
		
		guild.roles.resolve(KMS).members.forEach(
			e => e.roles.remove(KMS).then(console.log("USS borrado"))
		);
		
	}
	*/

	if(cmd === `${prefix}registro`) {

		let registerData = {ID: msg.author.id, Nombre: '', UID: '', Server: '', Faccion: '', PuntosIniciales: 0, Image_Start: ''}

		msg.channel.send(NOMBRE_M).then(() => {
			msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
			.then((collected) => {
				registerData.Nombre = collected.first().content;
				msg.channel.send(UID_M).then(()=>{
					msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
					.then((collected) => {
						const uid = collected.first().content.replace(/\s/g,'');
						if(!Number.isInteger(parseInt(uid))) {
							SendMessage(msg, UID_ERROR_M);
							return;
						}
						registerData.UID = uid;
						msg.channel.send(SERVER_M).then(()=>{
							msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
							.then((collected) => {
								const server_input = collected.first().content.toLowerCase().replace(/\s/g,'');
								if(!SERVERS.includes(server_input)){
									SendMessage(msg, SERVER_ERROR_M);
									return;
								}
								registerData.Server = server_input;
								msg.channel.send(FACTION_M).then(()=>{
									msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
									.then((collected) => {
										const faction_input = collected.first().content.toLowerCase().replace(/\s/g,'');
										if(!FACTIONS.includes(faction_input)) {
											SendMessage(msg, FACTION_ERROR_M);
											return;
										}
										registerData.Faccion = faction_input;

										msg.channel.send(POINTS_M).then(()=>{
											msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
											.then((collected) => {
												const points = collected.first().content.replace(/\s/g,'');
												if(!Number.isInteger(parseInt(points))) {
													SendMessage(msg, POINTS_ERROR_M);
													return;
												}

												registerData.PuntosIniciales = parseInt(points);

												if(registerData.PuntosIniciales < 0) {
													SendMessage(msg, POINTS_LESS_THAN_0_M);
													return;
												}

												msg.channel.send(POINTS_PICTURE_M).then(()=>{
													msg.channel.awaitMessages(response => response.attachments.size > 0, {max: 1, time: RESPONSE_TIME, errors: ['time']})
													.then((collected) => {
														const url = collected.first().attachments.first().url;
														if(!is_JPG_or_PNG(url)){
															SendMessage(msg, POINTS_PICTURE_FORMAT);
															return;
														}
														
														registerData.Image_Start = url;

														try {
															firebase.database().ref(registerData.ID).set({
																'id': registerData.ID,
																'uid': registerData.UID,
																'username': registerData.Nombre,
																'server': registerData.Server,
																'faccion': registerData.Faccion,
																'pts_start': registerData.PuntosIniciales,
																'image_start': registerData.Image_Start
															})
															.then( function () {
																SendMessage(msg, REGISTRO_COMPLETADO_M);
																SendNotification(msg, registerData.Faccion);
																
																try {
																	const guild = bot.guilds.resolve(SERVER_ID);
																	const user  = guild.members.resolve(registerData.ID);
																	let f = true;
																	if(user) {
																		user.roles.remove([HMS, USS, IJN, KMS, DGN]).then(function(){
																			user.roles.add(FACTION2DATA[registerData.Faccion].RoleID)
																			.then(function () {
																				SendMessage(msg, ROL_ASSIGN_SUCCESS_M1 + registerData.Faccion.toUpperCase() + ROL_ASSIGN_SUCCESS_M2);
																			})
																			.catch(function () {
																				SendMessage(msg, ROL_ASSIGN_ERROR_M);
																			});
																		});
																	}
																} catch(e) {
																	console.log(e);
																	SendMessage(msg, ROL_ASSIGN_ERROR_M);
																}
															})
															.catch(function () {
																console.log(e);
																SendMessage(msg, ROL_ASSIGN_ERROR_M);
															});
														}
														catch(e) {
															console.log(e);
															SendMessage(msg, REGISTRO_ERROR_M);
															return;
														}

														

													}).catch((e) => {
														console.log(e);
														Retry(msg)
													});
												});
											}).catch((e) => { Retry(msg); });
										});
									}).catch(() => { Retry(msg); });
								});
							}).catch(() => { Retry(msg); });
						});
					}).catch(() => { Retry(msg); });
				});
			}).catch(() => { Retry(msg); });
		});

	}
	
	if(cmd === `${prefix}puntos`) {

		let updateData = { ID: msg.author.id, PuntosFinales: 0, Image_End: '' };

		firebase.database().ref(updateData.ID).once('value', function(check) {
			if(!check.exists()) {
				msg.channel.send('No estás registrado!\nUtiliza primero el comando !registro');
				return;
			}
		});
		
		msg.channel.send(PTS_END_M).then(() => {
			msg.channel.awaitMessages(response => response.content, {max: 1, time: RESPONSE_TIME, errors: ['time']})
			.then((collected) => {
				const points = collected.first().content.replace(/\s/g,'');
				if(!Number.isInteger(parseInt(points))) {
					SendMessage(msg, POINTS_ERROR_M);
					return;
				}

				updateData.PuntosFinales = parseInt(points);

				if(updateData.PuntosIniciales < 0) {
					SendMessage(msg, POINTS_LESS_THAN_0_M);
					return;
				}
				
				msg.channel.send(PTS_END__IMAGE_M).then(()=>{
					msg.channel.awaitMessages(response => response.attachments.size > 0, {max: 1, time: RESPONSE_TIME, errors: ['time']})
					.then((collected) => {
						const url = collected.first().attachments.first().url;
						if(!is_JPG_or_PNG(url)){
							SendMessage(msg, POINTS_PICTURE_FORMAT);
							return;
						}
						
						updateData.Image_End = url;
						try {
							firebase.database().ref(updateData.ID).update({
								'pts_end': updateData.PuntosFinales,
								'image_end': updateData.Image_End
							})
							.then( function () {
								SendMessage(msg, MSG_END);
							})
							.catch(function () {
								console.log(e);
								SendMessage(msg, MSG_END_ERROR);
							});
						}
						catch(e) {
							console.log(e);
							SendMessage(msg, MSG_END_ERROR);
							return;
						}

					}).catch(() => { RetryPts(msg); });
				});
			}).catch(() => { RetryPts(msg); });
		});
	}
});

bot.login(process.env.token);

function Retry(handler){
	SendMessage(handler, TIMEOUT);
}

function RetryPts(handler){
	SendMessage(handler, TIMEOUT2);
}


function SendMessage(handler, message) {
	handler.channel.send(message);
}

function SendNotification(msg, faction) {
	const guild = bot.guilds.resolve(SERVER_ID);
	const alertChannel = guild.channels.resolve(ALERT_CHANNEL_ID);

	const m = new MessageEmbed()
	.setColor(FACTION2DATA[faction].Color)
	.setTitle(`${msg.author.username} se ha unido a ${FACTION2DATA[faction].Fullname}!`)
	.setFooter('Aurora Noctis event', "https://cdn.discordapp.com/attachments/456503841060421634/740931226105544764/RoyalNavy.png")
	.setImage(FACTION2DATA[faction].Banner);
	
	alertChannel.send(`${msg.author}`);
	alertChannel.send(m);
}

function is_JPG_or_PNG(url) {
	if(url.indexOf('png',url.length - 3) !== -1)
		return true;

	if(url.indexOf('jpg',url.length - 3) !== -1)
		return true;
	
	return false;
}
