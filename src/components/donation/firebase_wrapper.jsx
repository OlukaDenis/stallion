import Donation from "./donation";
import { useState } from "react";

import { generatePushID } from "../../utilities/generate_push_id";

export default function FirebaseWrapper() {

  // const [dbRefKey, setDbRefKey] = useState("");

  const dbRefKey = generatePushID();

  console.log("dbRefKey: ", dbRefKey);

  return <Donation dbRefKey={dbRefKey}></Donation>;
}
