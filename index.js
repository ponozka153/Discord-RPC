const RPC = require("discord-rpc");
const client = new RPC.Client({ transport: "ipc" });
const fs = require("fs");
//const axios = require("axios")

const prompt = require("prompt-sync")()

        //https://www.youtube.com/watch?v=pPN1hyKF-t4
        
        var config = ""
        
        if (!fs.readdirSync("./").includes("config.json")) {
        
            var data = JSON.stringify({
                Test: {
                    activity: {
                        details: "Testuji RPC od Míši :3",
                        assets: {
                            large_image: "test",
                            large_text: "Text pro big image, jak dát images se musíš zeptat mě",
                            small_image: "test_2",
                            small_text: "Text pro smol image"
                        },
                        timestamps: true,
                        instance: true
                    }
                },
                Test2: {
                    activity: {
                        details: "Testuji druhej test RPC od Míši :3",
                        assets: {
                            large_image: "test_3",
                            large_text: "Text pro big image, jak dát images se musíš zeptat mě",
                            small_image: "test_4",
                            small_text: "Text pro smol image"
                        },
                        buttons: [
                            {
                                "label": "Fortnite battlepass",
                                "url": "https://youtu.be/AkJYdRGu14Y?t=13"
                            }
                        ],
                        timestamps: false,
                        instance: true
                    }
                }
            }, 0, 4)
        
            fs.writeFileSync("./config.json", data)
            config = JSON.parse(fs.readFileSync("./config.json"))
        } else { config = JSON.parse(fs.readFileSync("./config.json")) }
        
        var options = ""
        var num = 1
        for(i in config){
            if(num === 1){
            options += `[${num}]${i}`
            num++
            } else {
                options += `\n[${num}]${i}`
                num++
            }
        }
        
        console.log(options)
        console.log("Vyber si který chceš mít presence.")
        
        var number = prompt("Napiš číslo: ")
        
        var choosen = options.split("\n")[number-1].replace(`[${number}]`, "")
        
        client.on("ready", () => {
            if(config[choosen].activity.timestamps === true){
            config[choosen].activity.timestamps = { start: Date.now() }
            } else {
                config[choosen].activity.timestamps = undefined
            }
            client.request("SET_ACTIVITY", { pid: process.pid, activity: config[choosen].activity });
            console.log(`Done, nyní máš Presence "${choosen}" :3`)
        });
        
        client.login({ clientId: "1024718539711582368" });