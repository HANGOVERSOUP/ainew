import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false, // 이 부분이 서버 렌더링을 끄는 옵션입니다.
  });

const PivotTable = ({dataArray}) => {
    const [state, setState] = useState([]);
    const [rendered, setRendered] = useState(false);
    const PlotlyRenderers = createPlotlyRenderers(Plot);

    useEffect(() => {
        // 브라우저 환경에서만 실행되도록 처리
        if (typeof window !== 'undefined') {
            setRendered(true);
        }
    }, []);

    return (
        rendered && (
            <PivotTableUI
                data={dataArray}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                onChange={(s) => setState(s)}
                {...state}
            />
        )
    );
};

export default PivotTable;
