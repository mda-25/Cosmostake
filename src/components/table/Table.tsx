import React from 'react';
import { Table as BTable } from 'react-bootstrap';
import Tbl from '../styled/Tbl';
import Row from './Row';

type TTable = {
    cols: any[];
    rows: any[];
};

const Table = ({ cols, rows }: TTable) => {
    return (
        <>
            {!rows.length && !rows ? (
                <div>Not data</div>
            ) : (
                <BTable>
                    <Tbl.THead>
                        <Tbl.Tr h="60px">
                            {cols.map((elem) => (
                                <Tbl.Th key={elem.key}>{elem.label}</Tbl.Th>
                            ))}
                        </Tbl.Tr>
                    </Tbl.THead>
                    <Tbl.TBody>
                        {rows.map((row, i) => (
                            <Row key={i} index={i + 1} row={row} cols={cols} />
                        ))}
                    </Tbl.TBody>
                </BTable>
            )}
        </>
    );
};

export default Table;
