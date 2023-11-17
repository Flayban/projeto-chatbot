
import axios from 'axios'; 

export const fetchData = async (input) => {
    const OPENAI_API_KEY="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"
    try{
        const response = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions'",
            {
              prompt: input,
              model: 'text-davinci-003',
              max_tokens: 50,
              n: 1,
              stop: ".",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`
              },
            }
          );
        
          return response.data.choices[0].text;
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
    
  };