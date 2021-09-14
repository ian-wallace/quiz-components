import '../src/components/d2l-activity-question-usage';
import { addToMock, mockLink } from './data/fetchMock';
import { expect, html } from '@open-wc/testing';
import { mockActivityQuestionUsage, mockActivityUsage, mockLinkPlacement } from './data/mockData';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '@brightspace-hmc/foundation-components/test/test-util';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const id = 13;
const points = 20;
const activityQuestionUsageHref = '/activity-question-usage';
const activityUsageHref = '/activity-usage';
const linkPlacementHref = '/link-placement';

async function _createComponent(path) {
	return await createComponentAndWait(html`<d2l-activity-question-usage href="${path}" token="test-token"></d2l-activity-question-usage>`);
}

function setupFetchMocks({ activityQuestionUsage = null, activityUsage = null, linkPlacement = null } = {}) {
	addToMock(
		activityQuestionUsageHref,
		activityQuestionUsage ? activityQuestionUsage : mockActivityQuestionUsage(id, points, activityUsageHref),
		_createComponent
	);

	addToMock(
		activityUsageHref,
		activityUsage ? activityUsage : mockActivityUsage(linkPlacementHref),
		_createComponent
	);

	addToMock(
		linkPlacementHref,
		linkPlacement ? linkPlacement : mockLinkPlacement(linkPlacementHref, 'some description'),
		_createComponent
	);
}

describe('d2l-activity-question-usage', () => {
	before(() => {
		clearStore();
		mockLink.reset();
		setupFetchMocks();
	});

	after(() => {
		mockLink.reset();
	});

	describe('accessibility', () => {
		it('should pass all axe tests', async() => {
			const el = await _createComponent(activityQuestionUsageHref);
			await expect(el).to.be.accessible();
		});
	});

	describe('construction', () => {
		it('should construct', () => {
			expect(() => runConstructor('d2l-activity-question-usage')).to.not.throw();
		});
	});

	describe('functionality', () => {
		// tests to ensure component is functioning as desired
		beforeEach(() => {
			clearStore();
		});

		afterEach(() => {
			mockLink.resetHistory();
		});

		describe('displays correct data', () => {
			it('should display correct name component and points', async() => {
				const el = await _createComponent(activityQuestionUsageHref);
				const name = el.shadowRoot.querySelector('d2l-hc-name');
				const input = el.shadowRoot.querySelector(`#points_input_${id}`);

				expect(name.href).to.equal(linkPlacementHref);
				expect(input.value).to.equal(points);
			});

			it('should display expected description in slot with description', async() => {
				const el = await _createComponent(activityQuestionUsageHref);
				const description = el.shadowRoot.querySelector('#desc_div').textContent;
				const hcDescriptionEl = el.shadowRoot.querySelector('#desc_div d2l-hc-description');

				expect(description.includes(' - ')).to.be.true;
				expect(hcDescriptionEl).to.not.be.null;
			});

			it('should display expected description in slot without description', async() => {
				mockLink.reset();
				setupFetchMocks({ linkPlacement: mockLinkPlacement(linkPlacementHref) });

				const el = await _createComponent(activityQuestionUsageHref);
				const description = el.shadowRoot.querySelector('#desc_div').textContent;
				const hcDescriptionEl = el.shadowRoot.querySelector('#desc_div d2l-hc-description');

				expect(description.includes(' - ')).to.be.false;
				expect(hcDescriptionEl).to.be.null;
			});
		});

		it('event gets triggered', async() => {
			const newPoints = 50;

			const el = await _createComponent(activityQuestionUsageHref);
			const input = el.shadowRoot.querySelector(`#points_input_${id}`);

			el.addEventListener('d2l-activity-question-usage-input-updated', () => {
				expect(el.points).to.equal(newPoints);
			});

			input.value = newPoints;
			const updateEvent = new CustomEvent('change');
			input.dispatchEvent(updateEvent);
		});

		const invalidValues = [0, -1, null, undefined, 10000];

		invalidValues.forEach(invalidValue => {
			it(`should be invalid for ${invalidValue}`, async() => {
				const el = await _createComponent(activityQuestionUsageHref);

				el.points = invalidValue;

				expect(!el.isValid()).to.be.true;
			});
		});
	});
});
