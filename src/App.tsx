//import { useApi } from "./hooks/useApi"; // fetching usando hook
import { useQuery } from "react-query"; //fetching usando react query
import axios from "axios";
//import { queryClient } from "./services/queryClient";

interface Repository {
  full_name: string;
  description: string;
}

function App() {
  // const {
  //   data: repositories,
  //   isFetching,
  //   fetchError,
  // } = useApi<Repository[]>("https://api.github.com/users/arianebrandao/repos");

  const { data: repositories, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/arianebrandao/repos"
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60, //1 minute
    }
  );

  //invalidateQueries(['repos'])

  //atualiza a descrição sem fazer uma nova requisição a api

  // const prevRepos = queryClient.getQueryData<Repository[]>("repos");
  // const currentRepo = "Teste";

  // if (prevRepos) {
  //   const updatedRepos = prevRepos.map((repo) => {
  //     if (repo.full_name === currentRepo) {
  //       return { ...repo, description: "Testando" };
  //     } else {
  //       return repo;
  //     }
  //   });

  //   queryClient.setQueryData("repos", updatedRepos);
  // }

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
