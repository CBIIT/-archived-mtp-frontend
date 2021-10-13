export const definition = {
  id: 'openPedCanGeneExpression',
  name: 'OpenPedCan Gene Expression',
  shortName: 'OP',
  hasData: ( data ) => {
    return data ? data.length > 0 : false;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
