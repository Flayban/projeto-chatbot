import {Configuration, OpenAIApi} from 'openai'

const config = new Configuration({
    apiKey: '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',
})
export const openai = new OpenAIApi(config)

