import React from 'react';
import { Spinner, Table as BTable } from 'react-bootstrap';
import styled from 'styled-components';
import Tbl from '../styled/Tbl';
import Row from './Row';

type TTable = {
    cols: any[];
    rows: any[];
    isLoading: boolean;
};

const WrapperLoader = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 20px;
`;

const Table = ({ cols, rows, isLoading }: TTable) => {
    return (
        <>
            {isLoading ? (
                <WrapperLoader>
                    <Spinner animation="border" role="status" />
                </WrapperLoader>
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
