import {json2csv} from 'json-2-csv';
import fs from 'fs';
import HandyCsv, {
	CSV_RESOLUTION,
	CSV_TIME_PER_INTERVAL,
	KK_LOOP_BASE_LENGTH,
	KK_SPEED_MAX,
	KK_SPEED_MIN
} from './csv/HandyCsv';
import ELoopType from './types/ELoopType';
import combinedPoses from './csv/combinedPoses';

interface ICsvStroke {
	time: number,
	position: number
}

for (const pose of combinedPoses) {
	const strokes: ICsvStroke[] = [];
	const states = pose.states;
	// theHandy ignores the first line of the csv, use it to store metadata
	const firstLine = `# ${pose.names[0]} / Resolution: ${CSV_RESOLUTION} / Interval length: ${CSV_TIME_PER_INTERVAL}ms / ${new Date().toISOString()}\n`;

	states.forEach((state, index) => {
		const baseTime = HandyCsv.getStateStartTimeByIndex(pose, index);
		switch (state.type) {
			case ELoopType.variable: {
				for (let i = 1; i <= CSV_RESOLUTION; i++) {
					const multi = KK_SPEED_MIN + (KK_SPEED_MAX - KK_SPEED_MIN) / (CSV_RESOLUTION - 1) * (i - 1);
					const length = KK_LOOP_BASE_LENGTH / multi / (state.multiplier ?? 1);
					for (let time = (i - 1) * CSV_TIME_PER_INTERVAL; time < i * CSV_TIME_PER_INTERVAL - length; time += length) {
						let lastTime = -1;
						for (const stroke of state.strokes) {
							if (stroke.time >= 1 || stroke.time <= lastTime) {
								throw new Error('Stroke.time is less than previous stroke');
							}
							lastTime = stroke.time;
							strokes.push({
								time: Math.round(time + baseTime + length * stroke.time),
								position: stroke.position
							});
						}
					}
				}
				break;
			}
			case ELoopType.single: {
				const length = KK_LOOP_BASE_LENGTH / (state.multiplier ?? 1);
				for (let time = 0; (time + length) < CSV_TIME_PER_INTERVAL; time += length) {
					for (const stroke of state.strokes) {
						strokes.push({
							time: Math.round(time + baseTime + length * stroke.time),
							position: stroke.position
						});
					}
				}
				break;
			}
			case ELoopType.manual: {
				// ignore for now, need to manually add strokes
				break;
			}
		}

	})

	json2csv(strokes, (err, csv) => {
		if (!csv) {
			console.log('CSV Error', err?.message);
		} else {
			fs.writeFileSync(`scripts/${pose.csv.name}`, firstLine + csv);
		}
	}, {
		prependHeader: false
	})
}