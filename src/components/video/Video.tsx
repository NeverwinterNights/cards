import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Video.module.scss';
import { useAppSelector } from '../../redux/store';
import { InitialStateTypeFile, TypeReader } from '../../redux/fileReducer';


export const Video = React.memo(() => {

	const { newFile } = useAppSelector<InitialStateTypeFile & TypeReader>(state => state.fileReducer);

	const videoRef = useRef<HTMLVideoElement>(null);

	const [duration, setDuration] = useState<number | null>();
	const [currentTime, setCurrentTime] = useState<number | null>();

	const [isControls, setIsControls] = useState<boolean>(false);


	useEffect(() => {
		setInterval(() => {
			setDuration(videoRef && videoRef.current && videoRef.current.duration);
			setCurrentTime(videoRef && videoRef.current && videoRef.current.currentTime);
		}, 300);
	}, []);


	const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setIsControls(e.currentTarget.checked);
	};

	const makeFullScreen = () => {
		if (videoRef && videoRef.current)

			if (videoRef.current.requestFullscreen) {
				videoRef.current.requestFullscreen();
			}
	};
	const play = () => {
		videoRef && videoRef.current && videoRef.current.play();

	};
	const pause = () => {
		videoRef && videoRef.current && videoRef.current.pause();
	};

	const volumeDown = () => {
		videoRef && videoRef.current && videoRef.current.volume > 0.1 ? videoRef.current.volume -= 0.1 : videoRef && videoRef.current && (videoRef.current.volume = 0);
	};
	const volumeUp = () => {
		videoRef && videoRef.current && videoRef.current.volume < 0.9 ? videoRef.current.volume += 0.1 : videoRef && videoRef.current && (videoRef.current.volume = 1);
	};

	const stop = () => {
		videoRef && videoRef.current && videoRef.current.pause();
		videoRef && videoRef.current && (videoRef.current.currentTime = 0);
	};

	const currentTimeDown = () => {
		videoRef && videoRef.current && videoRef.current.currentTime > 0.2 ? videoRef.current.currentTime -= 0.1 : videoRef && videoRef.current && (videoRef.current.currentTime = 1);
	};

	const currentTimeUp = () => {
		videoRef && videoRef.current && videoRef.current.currentTime < videoRef.current.duration - 0.3 ? videoRef.current.currentTime += 0.1 : videoRef && videoRef.current && videoRef.current.duration && (videoRef.current.currentTime = videoRef.current.duration);

	};

	const width100 = () => {
		videoRef && videoRef.current && (videoRef.current.width = 100);

	};


	const playbackRateUp = () => {
		videoRef && videoRef.current && videoRef.current.currentTime < 1 ? (videoRef.current.playbackRate += 0.1) : videoRef && videoRef.current && (videoRef.current.playbackRate = 1);

	};

	const playbackRateDown = () => {
		videoRef && videoRef.current && videoRef.current.currentTime > 1 ? (videoRef.current.playbackRate -= 0.1) : videoRef && videoRef.current && (videoRef.current.playbackRate = 0.2);

	};

	return (
		<div className={styles.main}>
			<h2>Video</h2>
			<div className={styles.control__inp}>
				<div>controls</div>
				<input type='checkbox' checked={isControls} onChange={onInputHandler} />
			</div>
			<div className={styles.video}>

					<video src={newFile} controls={isControls} ref={videoRef} width={'400px'}>
						<track default src={''} kind='captions' />
					</video>


			</div>
			<div className={styles.controls}>
				<button className={styles.button} onClick={play}>Play</button>
				<button className={styles.button} onClick={pause}>Pause</button>
				<button className={styles.button} onClick={makeFullScreen}>Full Screen</button>
				<button className={styles.button} onClick={volumeUp}>Volume Up</button>
				<button className={styles.button} onClick={volumeDown}>Volume Down</button>
				<button className={styles.button} onClick={currentTimeDown}>Current Time Down
				</button>
				<button className={styles.button} onClick={currentTimeUp}>Current Time Up</button>
				<button className={styles.button} onClick={stop}>Stop</button>
				<button className={styles.button} onClick={playbackRateUp}>Playback Rate Up
				</button>
				<button className={styles.button} onClick={playbackRateDown}>Playback Rate Down
				</button>
				<button className={styles.button} onClick={width100}>Width 100</button>
			</div>
			<div className={styles.footer}>
				<div className={styles.title}>Duration -</div>
				<div className={styles.duration_value}> {duration}</div>
				<div className={styles.title}>Current Time -</div>
				<div className={styles.current_time_value}> {currentTime} </div>
			</div>
		</div>
	);
});

