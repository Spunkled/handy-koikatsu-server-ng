import ELoopType from '../../types/ELoopType';
import {IInfoPose} from '../../csv/scriptedPoses';

const doggyDesk: IInfoPose = {
	aliases: [
		'Doggystyle Against Desk', '机バック',
	],
	states: [
		{
			names: ['Insert', 'A_Insert'],
			strokes: [
				{
					time: 0,
					position: 100
				},
				{
					time: 0.45,
					position: 0
				}
			],
			type: ELoopType.single
		},
		{
			names: ['InsertIdle', 'A_InsertIdle'],
			strokes: [
				{
					time: 0,
					position: 0
				},
				{
					time: 0.5,
					position: 20
				}
			],
			type: ELoopType.static
		},
		{
			names: ['WLoop', 'A_WLoop'],
			strokes: [
				{
					time: 0,
					position: 40
				},
				{
					time: 0.5,
					position: 0
				}
			],
			type: ELoopType.variable,
			maxMulti: 3
		},
		{
			names: ['SLoop'],
			strokes: [
				{
					time: 0,
					position: 70
				},
				{
					time: 0.4125,
					position: 10
				}
			],
			type: ELoopType.variable,
			maxMulti: 3
		},
		{
			names: ['A_SLoop'],
			strokes: [
				{
					time: 0,
					position: 75
				},
				{
					time: 0.45,
					position: 20
				}
			],
			type: ELoopType.variable,
			maxMulti: 3
		},
		{
			names: ['OLoop', 'A_OLoop'],
			strokes: [
				{
					time: 0,
					position: 10
				},
				{
					time: 0.5,
					position: 70
				}
			],
			baseSpeed: 5,
			type: ELoopType.static
		},
		{
			names: [
				'M_IN_Start', 'A_M_IN_Start',
				'M_IN_Loop', 'A_M_IN_Loop',
				'WF_IN_Start', 'A_WF_IN_Start',
				'WF_IN_Loop', 'A_WF_IN_Loop',
				'WS_IN_Start', 'A_WS_IN_Start',
				'WS_IN_Loop', 'A_WS_IN_Loop'
			],
			strokes: [
				{
					time: 0,
					position: 5
				},
				{
					time: 0.5,
					position: 30
				},
			],
			baseSpeed: 5,
			type: ELoopType.static
		},
		{
			names: ['IN_A', 'A_IN_A', 'WS_IN_A', 'A_WS_IN_A', 'M_OUT_Loop', 'A_M_OUT_Loop', 'M_OUT_Start', 'A_M_OUT_Start'],
			strokes: [
				{
					time: 0,
					position: 10
				},
				{
					time: 0.5,
					position: 30
				},
			],
			baseSpeed: 2,
			type: ELoopType.static
		},
		{
			names: ['OUT_A', 'A_OUT_A', 'Drop', 'A_Drop', 'Idle', 'A_Idle', 'Pull', 'A_Pull'],
			strokes: [
				{
					time: 0,
					position: 100
				},
			],
			type: ELoopType.static
		},
	],
	csv: {
		name: 'dogd.csv',
		sha256: '84a3a91dd7836186e0bf4df0998d2934ca56184e651f4b0c8688d1b3f01990d1',
		size: 38186
	}
}

export default doggyDesk;