import React from 'react';

import logo from './logo.svg';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.jessibuca = null;
        this.showOperateBtns = false;

        this.$container = null;
        this.forceNoOffscreen = false;

        this.state = {
            playUrl: 'http://flv.bdplay.nodemedia.cn/live/bbb.flv',
            isPlaying: false
        }
    }

    componentDidMount() {
        this.create();
    }

    create() {
        var showOperateBtns = true; // 是否显示按钮
        var forceNoOffscreen = true; //
        let $container = document.getElementById('container');
        this.jessibuca = new window.Jessibuca({
            container: $container,
            videoBuffer: 0.2, // 缓存时长
            isResize: false,
            text: "",
            loadingText: "",
            useMSE: false,
            debug: false,
            hasAudio:true,
            showBandwidth: showOperateBtns, // 显示网速
            operateBtns: {
                fullscreen: showOperateBtns,
                screenshot: showOperateBtns,
                play: showOperateBtns,
                audio: showOperateBtns,
                recorder: showOperateBtns
            },
            forceNoOffscreen: forceNoOffscreen,
            isNotMute: false,
        });
    }

    play() {
        if (this.jessibuca && this.state.playUrl) {
            this.jessibuca.play(this.state.playUrl);
            this.setState({
                isPlaying: true
            })
        }
    }

    pause() {
        if (this.jessibuca) {
            this.jessibuca.pause();
            this.setState({
                isPlaying: false
            })
        }
    }

    screenshot(){
        if(this.jessibuca){
            let file = this.jessibuca.screenshot('test','blob');
            console.log(file);
        }
    }

    destroy() {
        if (this.jessibuca) {
            this.jessibuca.destroy();
            this.setState({
                isPlaying: false
            })
        }
        this.create();
    }

    render() {
        return (
            <div className="root">
                <div className="container-shell">
                    <div id="container"></div>
                    <div className="input">
                        <div>输入URL：</div>
                        <input
                            autoComplete="on"
                            id="playUrl"
                            value={this.state.playUrl}
                            onChange={(e) => this.setState({playUrl: e.target.value})}
                        />
                        {
                            this.state.isPlaying ?
                                <button id="pause" onClick={this.pause.bind(this)}>停止</button> :
                                <button id="play" onClick={this.play.bind(this)}>播放</button>
                        }
                    </div>
                    {
                        this.state.isPlaying ?
                            <div className="input">
                                <button id="destroy" onClick={this.destroy.bind(this)}>销毁</button>
                                <button onClick={this.screenshot.bind(this)}>截图</button>
                            </div> : ''
                    }
                </div>
            </div>
        )
    }
}


export default App;
