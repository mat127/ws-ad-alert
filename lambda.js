import wscz from "./libs/site/wscz.js";
import {bazos,bazosTop} from "./libs/site/bazos.js";

// export for AWS as a lambda handler
export async function handler() {
    try {
        return Promise.all(
            [wscz, bazos, bazosTop]
                .map(s => s.process())
        );
    }
    catch(error) {
        console.log(error);
    }
}
