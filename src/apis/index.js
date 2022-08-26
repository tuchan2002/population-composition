import axios from "axios";

export const getPrefectures = async () => {
  try {
    const response = await axios.get(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      { headers: { "x-api-key": "R2ULU8qYHlbw9viz87UTZ7G9rQ7Uq5SjnzrZN3Gw" } }
    );
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getReportByPrefecture = async ({ prefName, prefCode }) => {
  try {
    const response = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      { headers: { "x-api-key": "R2ULU8qYHlbw9viz87UTZ7G9rQ7Uq5SjnzrZN3Gw" } }
    );
    return { data: response.data.result.data[0].data, prefCode, prefName };
  } catch (error) {
    console.log(error);
  }
};
