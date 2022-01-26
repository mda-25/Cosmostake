import React from 'react';
import Tbl from '../styled/Tbl';

type TRow = {
    row: any;
    cols: any;
    index: number;
};

const Row = ({ row, cols, index }: TRow) => {
    return (
        <Tbl.Tr>
            {cols.map((col: any) =>
                col.key === 'rank' ? (
                    <td key={col.key}>{index}</td>
                ) : (
                    <td key={col.key}>{col.process ? col.process(row) : ''}</td>
                ),
            )}
        </Tbl.Tr>
    );
};

export default Row;
