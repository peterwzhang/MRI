import React, { useRef, useState } from "react";
import BatchTable from '../components/BatchTable';
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import { url } from "../api/constants";
import { useQuery } from "@tanstack/react-query";
import { BatchCollection, BatchMetadata } from "../types";
import axios from "axios";
import BatchInfo from "../components/BatchInfo";
import { GridSelectionModel } from "@mui/x-data-grid";

export default function Dashboard(){
    const [batch, setBatch] = useState<BatchMetadata | undefined>(undefined);
    const ref = useRef<null | HTMLDivElement>(null)

    const fetchBatches = (): Promise<void | BatchCollection> => axios.get(`${url}/api/batches`).then(response => response.data)
    const { isLoading, error, data } = useQuery(['batches'], fetchBatches)

    const handleSelect = (selection: GridSelectionModel) => {
        setBatch(data?.find(b => b.id == selection.at(0)))
        ref.current?.scrollIntoView() 
    }
    const handleCancel = (selection: GridSelectionModel) => {
        console.log(selection) //TODO: cancel batch
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    else if (data) {
        let progress = 0
        data.forEach((batch) => batch.status == "COMPLETED" && progress++)
        progress = (progress / data.length) * 100


        return (
            <div>
                <ColWrapper>
                    <Widget>
                        <h2>Batches</h2>
                        <ProgressBar progress={progress}/>
                        <BatchTable batches={data} handleSelect={handleSelect} handleCancel={handleCancel}/>
                    </Widget>
                    {batch && (
                        <Widget ref={ref}>
                            <BatchInfo batch={batch}/>
                        </Widget>
                    )}
                </ColWrapper>
            </div>
    )}
}

const ColWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Widget = styled(SectionDiv)`
    min-width: 30%;
    max-width: 100%;
    margin-bottom: 0rem;
`

