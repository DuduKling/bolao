import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/pages/admin.css';

import routes from '../util/Routes';
import http from '../../util/http';

import MaterialTextInput from '../util/MaterialTextInput';
import MaterialSelect from '../util/MaterialSelect';
import MaterialCheckbox from '../util/MaterialCheckbox';
import Loading from '../util/Loading';

function PageAdminCreatePool() {
    const [pool, setPool] = useState({});
    const [championshipsInfo, setChampionshipsInfo] = useState({});

    const [championshipIdSelected, setChampionshipIdSelected] = useState(0);
    const [partsSelected, setPartsSelected] = useState({});

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getChampionshipsInfo();
    }, []);

    const getChampionshipsInfo = async () => {
        setLoading(true);

        await http.getChampionshipsInfo()
            .then((response) => {
                setChampionshipsInfo(response.championshipsInfo);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const createPool = async (event) => {
        event.preventDefault();

        setLoading2(true);

        const data = {
            poolInfo: pool,
            partsSelected,
        };

        await http.createPool(data)
            .then((response) => {
                navigate(routes.sendToAdminPool(response.poolInfo.uuid));

                setLoading2(false);
            })
            .catch(() => {
                setLoading2(false);
            });
    };

    const showPartsSelection = () => {
        if (championshipIdSelected !== 0) {
            const selectedChampionship = championshipsInfo.find((c) => String(c.id) === championshipIdSelected);
            if (!selectedChampionship) { return; }
            return selectedChampionship.phases.map((phase) => showChampionshipPhases(phase));
        }
    };

    const showChampionshipPhases = (phase) => {
        return (
            <>
                <br />
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
                fieldController={(value) => setPartsSelected({ ...partsSelected, [part.id]: value })}
            />
        );
    };

    const campeonatosOptions = () => {
        if (Object.keys(championshipsInfo).length > 0) {
            return [
                { value: 0, label: 'Selecione' },
                ...championshipsInfo.map((champ) => ({ value: champ.id, label: champ.name }))
            ];
        }
        return [{}];
    };

    return (
        <div className="userPage-container">
            <div className="userPage-userCampeonatos">
                <h3 className="page-title -admin">
                    Criar bolão
                    <Loading loading={loading} localstorage="-withLocalStorage" />
                </h3>
                <div className="adminPools-container">
                    <form
                        className="inputForm"
                        onSubmit={(event) => createPool(event)}
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
                        <MaterialTextInput
                            labelName="Data de início"
                            // fieldPlaceholder="2000-00-00"
                            fieldName="startDate"
                            fieldType="text"
                            fieldValue={pool.startDate}
                            fieldController={(value) => setPool({ ...pool, startDate: value })}
                        />
                        <MaterialTextInput
                            labelName="Data de término"
                            // fieldPlaceholder="2000-00-00"
                            fieldName="endDate"
                            fieldType="text"
                            fieldValue={pool.endDate}
                            fieldController={(value) => setPool({ ...pool, endDate: value })}
                        />
                        <MaterialSelect
                            labelName="Campeonato"
                            fieldValue={pool.status}
                            fieldOptions={campeonatosOptions()}
                            fieldController={(value) => {
                                setChampionshipIdSelected(value);
                                setPartsSelected({});
                            }}
                        />
                        {showPartsSelection()}
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

export default PageAdminCreatePool;
