console.log('lscustoms started')
onNet('userIsMechanicEvent', () => {
    const user = (global as any).source

    console.log(`check ${user} is mechanic`);

    emitNet('userIsMechanicEventHandler', user, { isMechanic: true });
});

onNet('canCustomizeEvent', () => {
    const user = (global as any).source

    console.log(`check ${user} pode customizar`);

    emitNet('canCustomizeEventHandler', user, { canCustomize: true });
});