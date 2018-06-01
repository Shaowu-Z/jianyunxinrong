import apiCall from '.Call'

export const findTeamList = function (params) { //
    let url = '/concats_api/find_team_list'
    return apiCall(params, url)
}

// export const findTeamList = function (params) { //
//     let url = '/concats_api/find_team_list'
//     return apiCall(params, url)
// }