import { LightningElement } from 'lwc';

export default class PlayersParent extends LightningElement {

    playersList=[
        {
            jerseyNumber:18,
            img:"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/164.png",
            name:"Virat Kohli",
            description:"Right-Hand Batsmen"
        },
        {
            jerseyNumber:17,
            img:"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/2972.png",
            name:"Rishab Pant",
            description:"Left-Hand Batsmen"
        },
        {
           jerseyNumber:13,
           img:"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/3840.png",
           name:"Mohammed Siraj",
           description:"Right-Arm Fast Bowler"
        }
    ]
}