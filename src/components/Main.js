import React from 'react';
//import  ShotChart  from './ShotChart';
import DataViewContainer from "./DataViewContainer";
import  Profile  from './Profile';
import nba from 'nba';
import SearchBar from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer('Stephen Curry').playerId,
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }
    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }

    render() {
        return (
            <div className = 'main'>
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                <Profile playerInfo ={this.state.playerInfo}/>
                {/* <ShotChart playerId={this.state.playerId} />*/}
                <DataViewContainer  playerId={this.state.playerId} />
            </div>
            </div>

        );

    }
    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);

    }

}
export default Main;
