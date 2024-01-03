import {useQueries} from "@tanstack/react-query";
import axios from "axios";

type Item = {
    name: string;
    comments: number;
}
const fetchData = async (id: number): Promise<Item[]> => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    return response.data;
};

export default function useData() {
    const ids = Array.from({length: 100}, (_, index) => index + 1);

    const {data} = useQueries({
        queries: ids.map(id => (
            {queryKey: ['comments', id], queryFn: () => fetchData(id)}
        )),
        combine: (results) => {
            return ({
                data: results.map(result => {
                        if (!result.data) {
                            return;
                        }
                        return {
                            postId: result.data[0].postId,
                            comments:
                                Math.floor(Math.random() * 100)
                        }
                    }
                ),
                pending: results.some(result => result.isPending),
            })
        }
    })

    return data
}