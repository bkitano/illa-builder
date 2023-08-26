import Axios from "axios"
import { Transformer } from "@/redux/currentApp/action/actionState"

export async function runActionPrompt(transformer: Transformer, rawData: any) {
  let calcResult: any = rawData
  if (transformer?.enable) {
    const prompt = transformer.rawData
    const content = `${prompt} ${JSON.stringify(rawData)}`

    console.log("************************************")
    console.log("************************************")
    console.log("************************************")
    console.log("************************************")
    console.log(content)
    console.log("************************************")
    console.log("************************************")
    console.log("************************************")
    console.log("************************************")

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      temperature: 0.7,
    }

    const token = "lol no"
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    const response = await Axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      config,
    )

    try {
      console.log("************************************")
      console.log("************************************")
      console.log("************************************")
      console.log("************************************")
      console.log(response)

      // @ts-ignore
      calcResult = response["data"]["choices"][0]["message"]["content"]

      console.log("************************************")
      console.log("************************************")
      console.log("************************************")
      console.log("************************************")
    } catch (e) {
      console.log(e)
    }
  }
  return calcResult
}
