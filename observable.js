//initial_inside_pricing.js observable

const { from, forkJoin } = require('rxjs');
const { filter, mergeMap, map, publishBehavior } = require('rxjs/operators');

export default (main$, solace_message$) => {
    const inital_inside_pricing$ = main$.pipe(
        filter(message => /*filter for message commanding request*/),
        mergeMap(message =>
            forkJoin(
                from(fetch(/*make request*/)).pipe(
                    map(response => {
                        if (response.status == 200)
                            return //get data out of response
                        else
                            return {} //empty data if error
                    })
                ),
                solace_message$.pipe(
                    filter(message => message.messageType === 8000),
                    scan((acc, message) => {
                        // acc[message.cusip] = message.data

                        return acc;
                    }, {})
                )
            )
        ),
        map(([initial_data, solace_updates]) => {
            _.forEach(solace_updates, (cusip, message) => {
                //update initial_data where update id higher in update message
            })

            return initial_data;
        }),
        publishBehavior({}) //{} is initial state
    )

    inital_inside_pricing$.connect();

    return inital_inside_pricing$;
}

//inside webworker.js

initial_inside_pricing$.subscribe(
    //postMessage to main
)



//inside_pricing.js

export default (solace_message$, inital_inside_pricing$, filter_state$) => {

    let inside_pricing$ = solace_mesasge$.pipe(
        filter(message => message.messsageType === 8000)
        bufferTime(500)
        withLatestFrom(inital_inside_pricing$, fiter_state$)
        map([messages, inital_inside_pricing, filter_state]) => {

        }
    )

    inside_pricing$= inside_pricing$.pipe(
    publish())
}
