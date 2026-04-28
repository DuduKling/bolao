import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../css/pages/admin.css';

import http from '../../util/http';

import MaterialTextInput from '../util/MaterialTextInput';
// import MaterialSwitch from '../util/MaterialSwitch';
import MaterialSelect from '../util/MaterialSelect';
import MaterialCheckbox from '../util/MaterialCheckbox';
import Loading from '../util/Loading';

function PageAdminEditPool() {
    const [pool, setPool] = useState([]);
    const [championshipInfo, setChampionshipInfo] = useState({});
    const [partsSelected, setPartsSelected] = useState({});

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const params = useParams();
    const poolUuid = params.poolUuid;

    const statusOptions = [
        { value: 'tba', label: 'Fechado', selected: true },
        { value: 'open', label: 'Aberto' },
        { value: 'onGoing', label: 'Em andamento' },
        { value: 'finished', label: 'Finalizado' },
    ];

    useEffect(() => {
        getPools();
    }, []);

    const getPools = async () => {
        setLoading(true);

        const data = {
            poolUuid,
        };

        await http.getPool(data)
            .then((response) => {
                setPool(response.poolInfo);
                setChampionshipInfo(response.poolChampionshipInfo);

                const parts = response.poolChampionshipInfo.phases.reduce((acc, phase) => {
                    phase.parts.map((part) => acc[part.id] = part.isJoined);
                    return acc;
                }, {});
                setPartsSelected(parts);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const sendConfig = async (event) => {
        event.preventDefault();

        setLoading2(true);

        const data = {
            poolInfo: pool,
            partsSelected,
        };

        await http.updatePoolInfo(data)
            .then((response) => {
                setPool(response.poolInfo);
                setChampionshipInfo(response.poolChampionshipInfo);

                const parts = response.poolChampionshipInfo.phases.reduce((acc, phase) => {
                    phase.parts.map((part) => acc[part.id] = part.isJoined);
                    return acc;
                }, {});
                setPartsSelected(parts);

                setLoading2(false);
            })
            .catch(() => {
                setLoading2(false);
            });
    };

    const showChampionshipPhases = (phase) => {
        return (
            <>
                <div>Fase: {phase.name}</div>
                <div>{phase.parts.map((part) => showParts(part))}</div>
            </>
        );
    };

    const showParts = (part) => {
        return (
            <MaterialCheckbox
                labelName={part.name}
                fieldValue={partsSelected[part.id]}
                fieldDisabled={!!partsSelected[part.id]}
                fieldController={(value) => setPartsSelected({ ...partsSelected, [part.id]: value })}
            />
        );
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">
                <h3 className="page-title -admin">
                    {pool.name}
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <div className="adminPools-container">
                    <form
                        className="inputForm"
                        onSubmit={(event) => sendConfig(event)}
                        method="post"
                    >
                        <MaterialTextInput
                            labelName="Nome"
                            fieldType="text"
                            fieldValue={pool.name}
                            fieldController={(value) => setPool({ ...pool, name: value })}
                        />
                        <MaterialTextInput
                            labelName="Descrição"
                            fieldType="text"
                            fieldValue={pool.description}
                            fieldController={(value) => setPool({ ...pool, description: value })}
                        />
                        <MaterialSelect
                            labelName="Status"
                            fieldValue={pool.status}
                            fieldOptions={statusOptions}
                            fieldController={(value) => setPool({ ...pool, status: value })}
                        />
                        {/* <MaterialSwitch
                            labelName="Fazer apostas"
                            fieldValue={pool.canMakeBet}
                            fieldController={(value) => setPool({ ...pool, canMakeBet: value })}
                        />
                        <MaterialSwitch
                            labelName="Editar apostas"
                            fieldValue={pool.canEditBet}
                            fieldController={(value) => setPool({ ...pool, canEditBet: value })}
                        />
                        <MaterialSwitch
                            labelName="Ver apostas dos outros"
                            fieldValue={pool.canViewOthersBet}
                            fieldController={(value) => setPool({ ...pool, canViewOthersBet: value })}
                        /> */}
                        <MaterialTextInput
                            labelName="Data de início"
                            fieldName="startDate"
                            fieldType="text"
                            fieldValue={pool.startDate}
                            fieldController={(value) => setPool({ ...pool, startDate: value })}
                        />
                        <MaterialTextInput
                            labelName="Data de término"
                            fieldName="endDate"
                            fieldType="text"
                            fieldValue={pool.endDate}
                            fieldController={(value) => setPool({ ...pool, endDate: value })}
                        />
                        <h4>{championshipInfo.name}</h4>
                        {
                            Object.keys(championshipInfo).length > 0 ?
                                championshipInfo.phases.map((phase) => showChampionshipPhases(phase)) :
                                ''
                        }
                        <div>
                            <input type="submit" className="SendButton" value="Salvar" />
                            <Loading loading={loading2} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default PageAdminEditPool;
