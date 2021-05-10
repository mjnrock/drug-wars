import Network from "@lespantsfancy/agency/lib/event/Network";
// import Network from "../../event/Network";

//TODO  Setup a reducer/dispatch paradigm for React

export class ReactNetwork extends Network {
    constructor(state = {}, modify = {}) {
        super(state, modify);

        this.alter({
            $routes: [
                message => "react",
            ],
            react: {
                handlers: {},
                globals: {
                    network: this,
                },
            },
        });
    }

    reduce([ state, oldState ], globals = {}) {
        console.log(state)
        console.log(oldState)
        console.log(globals)
    }
};

export default ReactNetwork;