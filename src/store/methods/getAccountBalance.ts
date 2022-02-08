export const getAccountBalance = async (
    address: string,
    handleBalance: (address: string) => Promise<any>,
) => {
    const balance = await handleBalance(address);

    return balance.result[0];
};
