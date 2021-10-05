import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';

export const BaseMixin = superclass => class extends RtlMixin(LocalizeMixin(superclass)) {
	static async getLocalizeResources(langs) {
		let translations;
		for await (const lang of langs) {
			switch (lang.toLowerCase()) {
				case 'en':
					translations = await import('../../locales/en.js');
					break;
				case 'en-us':
					translations = await import('../../locales/en.js');
					break;
				case 'ar-sa':
					translations = await import('../../locales/ar-SA.js');
					break;
				case 'cy-gb':
					translations = await import('../../locales/cy-GB.js');
					break;
				case 'da-dk':
					translations = await import('../../locales/da-DK.js');
					break;
				case 'de-de':
					translations = await import('../../locales/de-DE.js');
					break;
				case 'es-es':
					translations = await import('../../locales/es-ES.js');
					break;
				case 'es-mx':
					translations = await import('../../locales/es-MX.js');
					break;
				case 'fr-ca':
					translations = await import('../../locales/fr-CA.js');
					break;
				case 'fr-fr':
					translations = await import('../../locales/fr-FR.js');
					break;
				case 'fr-on':
					translations = await import('../../locales/fr-ON.js');
					break;
				case 'ja-jp':
					translations = await import('../../locales/ja-JP.js');
					break;
				case 'ko-kr':
					translations = await import('../../locales/ko-KR.js');
					break;
				case 'nl-nl':
					translations = await import('../../locales/nl-NL.js');
					break;
				case 'pt-br':
					translations = await import('../../locales/pt-BR.js');
					break;
				case 'sv-se':
					translations = await import('../../locales/sv-SE.js');
					break;
				case 'tr-tr':
					translations = await import('../../locales/tr-TR.js');
					break;
				case 'zh-cn':
					translations = await import('../../locales/zh-CN.js');
					break;
				case 'zh-tw':
					translations = await import('../../locales/zh-TW.js');
					break;
			}

			if (translations && translations.val) {
				return {
					language: lang,
					resources: translations.val
				};
			}
		}
		translations = await import('../../locales/en.js');
		return {
			language: 'en',
			resources: translations.val
		};
	}

	localize(key, params) {
		return super.localize(key, params) || `{language term '${key}' not found}`;
	}

	changePage(page, pageData) {
		const changePageEvent = new CustomEvent('change-page', {
			detail: {
				page,
				pageData
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(changePageEvent);
	}
};
