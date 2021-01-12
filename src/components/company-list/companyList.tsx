import React, {useEffect, useState} from "react";
import {ICompanyListProps} from "./interfaces/ICompanyListProps";
import {ICompany} from "./interfaces/ICompany";
import useDebounce from "../../utils/utils";

function CompanyList({searched}: ICompanyListProps) {
    const [list, setList] = useState<Array<ICompany>>([]);

    const debounceSearch = useDebounce(searched, 1500);
    const searchCompany = (searchName: string): Promise<Array<ICompany>> => {
        return fetch((`https://api.overheid.io/suggest/openkvk/${searchName}?ovio-api-key=06f37335f01597898c16ffbd729d31c4763768f49f2621384cd2ee021cf976ca`), {
            method: 'GET'
        }).then((response) => response.json())
        .then((data) => data.handelsnaam);
    }

    useEffect(() => {
        if (debounceSearch.length > 0) {
            searchCompany(debounceSearch).then((data: Array<ICompany>) => {
                if(data) {
                    setList(data);
                } else {
                    setList([]);
                }
            })
        } else {
            setList([]);
        }

    }, [debounceSearch]);

    return (
        <div className='company-list'>
            {searched.length ?
                <>
                    {list.length ? list.map((company: ICompany) =>
                            <div key={company.id} className='company-card'>
                                <h3>{company.handelsnaam}</h3>
                                <span>{company.dossiernummer}</span>
                                <span>{company.plaats}</span>
                            </div>
                        ) :
                        <>
                            <h1>NOTHING FOUND</h1>
                        </>
                    }
                </> :
                <>
                    <h1>START SEARCHING</h1>
                </>
            }
        </div>
    );
}

export default CompanyList;
