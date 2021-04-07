import { addToMock } from './fetchMock';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage',
	assignment: 'https://api.brightspace.com/rels/assignment',
	userActivityUsage: 'https://activities.api.brightspace.com/rels/user-activity-usage'
});

export function mockActivityCollection(activityQuestionUsages, createComponent) {
	const entities = [];

	activityQuestionUsages.forEach(({id, points, activityUsageHref, activityQuestionUsageHref}) => {
		entities.push(mockActivityQuestionUsage(
			id,
			points,
			activityUsageHref,
			activityQuestionUsageHref
		));

		addToMock(
			activityQuestionUsageHref,
			mockActivityQuestionUsage(
				id,
				points,
				activityUsageHref,
				activityQuestionUsageHref
			),
			createComponent
		);

		addToMock(
			activityUsageHref, {}, createComponent
		);
	});

	return {
		entities
	};
}

export function mockActivityQuestionUsage(id, points, activityUsageHref, activityQuestionUsageHref) {
	const links = [
		{
			rel: [
				rels.activityUsage
			],
			href: activityUsageHref
		}
	];

	if (activityQuestionUsageHref) {
		links.push(
			{
				rel: ['self'],
				href: activityQuestionUsageHref
			}
		);
	}

	return {
		rel: [
			'item'
		],
		properties: {
			id,
			points
		},
		links,
		actions: [
			{
				href: 'some-href',
				name: 'set-points',
				method: 'PATCH',
				fields: [
					{
						type: 'number',
						name: 'points'
					}
				]
			}
		]
	};
}

export function mockActivityUsage(userActivityUsageHref) {
	return {
		class: [
			'activity-usage'
		],
		links: [
			{
				rel: [
					rels.userActivityUsage
				],
				href: userActivityUsageHref
			}
		]
	};
}

export function mockUserActivityUsage(assignmentHref) {
	return {
		links: [
			{
				rel: [
					rels.assignment
				],
				href: assignmentHref
			}
		]
	};
}

export const activityCollection = [
	{
		id: 1,
		points: 10,
		activityUsageHref: '/activity-usage',
		activityQuestionUsageHref: '/activity-question-usage'
	},
	{
		id: 2,
		points: 20,
		activityUsageHref: '/activity-usage-2',
		activityQuestionUsageHref: '/activity-question-usage-2'
	},
	{
		id: 3,
		points: 30,
		activityUsageHref: '/activity-usage-3',
		activityQuestionUsageHref: '/activity-question-usage-3'
	}
];

export const activityCollectionSingleItem = [
	{
		id: 1,
		points: 10,
		activityUsageHref: '/activity-usage',
		activityQuestionUsageHref: '/activity-question-usage'
	}
];
