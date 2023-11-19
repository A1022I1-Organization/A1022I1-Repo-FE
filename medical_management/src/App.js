
import { AppRouter } from "./AppRouter";
import { StatisticsMaterial } from "./layouts/statistics_material/StatisticsMaterial";
import { CreateAccount } from "./layouts/account/CreateAccount";

function App() {
  return (
    <div>
      <AppRouter />
      <CreateAccount />
    </div>

  );
}

export default App;
