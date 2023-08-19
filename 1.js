const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 300);
});

myPromise.then(handleFulfilledA, handleRejectedA).then(handleFulfilledB, handleRejectedB).then(handleFulfilledC, handleRejectedC);
