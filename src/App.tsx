import { useEffect, useState } from "react";
("./App.css");
async function getLastCommitDate(username: string, repo_name: string) {
  let last_commit;
  const repo_url = `https://api.github.com/repos/${username}/${repo_name}`;
  try {
    const response = await fetch(repo_url);
    if (!response.ok) {
      throw new Error("hold this L");
    }
    const data = await response.json();
    last_commit = data.pushed_at;
  } catch (error) {
    console.error(error);
  } finally {
    return last_commit || "no data";
  }
}
function App() {
  const [d, setD] = useState("");
  useEffect(() => {
    let ignore = false;
    getLastCommitDate("kjameer0", "hashmap-visualizer").then((data) => {
      if (!ignore) {
        setD(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="App">
      <div className="project-display">
        <h2>Data Structure Visualizer</h2>
        <img
          src="https://kjameer0.github.io/hashmap-visualizer/assets/binary-tree-5dde4aad.png"
          alt="data-Structure-visualizer"
        />
        <p>Date: </p>
        <p>{d}</p>
      </div>
    </div>
  );
}

export default App;
