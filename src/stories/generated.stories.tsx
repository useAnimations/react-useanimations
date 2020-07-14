import React from 'react';
import activity from '../lib/activity';
import airplay from '../lib/airplay';
import alertCircle from '../lib/alertCircle';
import alertOctagon from '../lib/alertOctagon';
import alertTriangle from '../lib/alertTriangle';
import archive from '../lib/archive';
import arrowDown from '../lib/arrowDown';
import arrowDownCircle from '../lib/arrowDownCircle';
import arrowLeftCircle from '../lib/arrowLeftCircle';
import arrowRightCircle from '../lib/arrowRightCircle';
import arrowUp from '../lib/arrowUp';
import arrowUpCircle from '../lib/arrowUpCircle';
import bookmark from '../lib/bookmark';
import calendar from '../lib/calendar';
import checkBox from '../lib/checkBox';
import codepen from '../lib/codepen';
import copy from '../lib/copy';
import download from '../lib/download';
import edit from '../lib/edit';
import explore from '../lib/explore';
import facebook from '../lib/facebook';
import github from '../lib/github';
import heart from '../lib/heart';
import infinity from '../lib/infinity';
import info from '../lib/info';
import instagram from '../lib/instagram';
import linkedin from '../lib/linkedin';
import loading from '../lib/loading';
import loading2 from '../lib/loading2';
import loading3 from '../lib/loading3';
import lock from '../lib/lock';
import mail from '../lib/mail';
import maximizeMinimize from '../lib/maximizeMinimize';
import maximizeMinimize2 from '../lib/maximizeMinimize2';
import menu from '../lib/menu';
import menu2 from '../lib/menu2';
import menu3 from '../lib/menu3';
import menu4 from '../lib/menu4';
import microphone from '../lib/microphone';
import microphone2 from '../lib/microphone2';
import notification from '../lib/notification';
import notification2 from '../lib/notification2';
import playPause from '../lib/playPause';
import playPauseCircle from '../lib/playPauseCircle';
import plusToX from '../lib/plusToX';
import pocket from '../lib/pocket';
import radioButton from '../lib/radioButton';
import scrollDown from '../lib/scrollDown';
import searchToX from '../lib/searchToX';
import settings from '../lib/settings';
import settings2 from '../lib/settings2';
import share from '../lib/share';
import skipBack from '../lib/skipBack';
import skipForward from '../lib/skipForward';
import star from '../lib/star';
import thumbUp from '../lib/thumbUp';
import toggle from '../lib/toggle';
import trash from '../lib/trash';
import trash2 from '../lib/trash2';
import twitter from '../lib/twitter';
import userMinus from '../lib/userMinus';
import userPlus from '../lib/userPlus';
import userX from '../lib/userX';
import video from '../lib/video';
import video2 from '../lib/video2';
import visibility from '../lib/visibility';
import visibility2 from '../lib/visibility2';
import volume from '../lib/volume';
import youtube from '../lib/youtube';
import youtube2 from '../lib/youtube2';
import UseAnimation from '..';

export default {
  title: 'Animations',
  component: UseAnimation,
};
export const All = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={activity} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>airplay</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={airplay} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>alertCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={alertCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>alertOctagon</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={alertOctagon} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>alertTriangle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={alertTriangle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>archive</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={archive} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowDown</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowDown} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowDownCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowDownCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowLeftCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowLeftCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowRightCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowRightCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowUp</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowUp} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>arrowUpCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={arrowUpCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>bookmark</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={bookmark} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>calendar</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={calendar} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>checkBox</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={checkBox} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>codepen</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={codepen} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>copy</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={copy} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>download</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={download} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>edit</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={edit} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>explore</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={explore} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>facebook</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={facebook} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>github</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={github} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>heart</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={heart} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>infinity</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={infinity} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>info</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={info} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>instagram</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={instagram} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>linkedin</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={linkedin} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>loading</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={loading} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>loading2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={loading2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>loading3</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={loading3} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>lock</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={lock} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>mail</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={mail} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>maximizeMinimize</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={maximizeMinimize} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>maximizeMinimize2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={maximizeMinimize2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>menu</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={menu} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>menu2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={menu2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>menu3</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={menu3} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>menu4</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={menu4} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>microphone</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={microphone} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>microphone2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={microphone2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>notification</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={notification} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>notification2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={notification2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>playPause</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={playPause} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>playPauseCircle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={playPauseCircle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>plusToX</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={plusToX} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>pocket</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={pocket} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>radioButton</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={radioButton} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>scrollDown</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={scrollDown} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>searchToX</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={searchToX} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>settings</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={settings} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>settings2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={settings2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>share</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={share} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>skipBack</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={skipBack} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>skipForward</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={skipForward} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>star</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={star} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>thumbUp</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={thumbUp} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>toggle</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={toggle} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>trash</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={trash} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>trash2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={trash2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>twitter</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={twitter} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>userMinus</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={userMinus} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>userPlus</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={userPlus} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>userX</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={userX} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>video</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={video} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>video2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={video2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>visibility</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={visibility} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>visibility2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={visibility2} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>volume</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={volume} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>youtube</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={youtube} />
    </div>
    <div style={{ padding: '20px' }}>
      <span>youtube2</span>
      <UseAnimation size={40} wrapperStyle={{ marginTop: '5px' }} animation={youtube2} />
    </div>
  </div>
);
