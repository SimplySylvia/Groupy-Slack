const 
    SlackBot = require("slackbots"),
    // config = require("./config.json"),
    token = process.env.ENV_TOKEN,
    channel = "slack-bot-testing",
    shuffleFile = require('./shuffle.js'),
    shuffleFunc = shuffleFile.shuffle,
    students = shuffleFile.students

let params = {
    icon_emoji: ':epic-ride:'
    };

let bot = new SlackBot({
    token: token,
    name: "Groupy"
    });

bot.on("start", function() {
    console.log("Hello world!");
    let channels = bot.getChannels()
    let arr = channels._value.channels
    var result = arr.filter(obj => {
        return obj.name === channel
      })
    // console.log(result);
    });

bot.on("message", (data) => {
    
    if (data.type !== "message") {
        return;
    }
    handleMessage(data.text);
    })

handleMessage = (message) => {
    switch(message) {
        case "groupy help":
            sendHelp();
            break;
        case "groupy pairs":
            console.log('hello pairs');
            sendPairs();
            break;
        case "groupy 3":
            console.log('hello pairs');
            sendThree();
            break;
        case "groupy 2":
            console.log('hello pairs');
            sendTwo();
            break;
        default:
            return;
        }
    }

sendHelp = () => {
    let response = `You can use the folloing commands: groupy pairs (returns everyone in pairs), groupy 2 (Two groups will be returned), groupy 3 (Three groups will be returned)`
    bot.postMessageToChannel(channel, response, params);
    }

sendPairs = async () => {
    let response = `Here are your Groups!`
    await bot.postMessageToChannel(channel,response , params);
    await groupsOutput(5);
}

sendThree = async () => {
    let response = `Here are your Groups!`
    await bot.postMessageToChannel(channel,response , params);
    await groupsOutput(3);
}

sendTwo = async () => {
    let response = `Here are your Groups!`
    await bot.postMessageToChannel(channel,response , params);
    await groupsOutput(2);
}

groupsOutput = (num) => { 
    let groups = shuffleFunc(students, num);

    Object.keys(groups).forEach(e => {
        let response = `${groups[e]}`
        bot.postMessageToChannel(channel, response, params);
    });
}


