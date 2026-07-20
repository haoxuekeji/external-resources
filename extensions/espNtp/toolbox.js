/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPNTP_CATEGORY}" id="ESPNTP_CATEGORY" colour="#FF8C1A" secondaryColour="#DB6E00" iconURI="">
    <block type="espNtp_sync" id="espNtp_sync">
        <value name="TZ">
            <shadow type="math_number">
                <field name="NUM">8</field>
            </shadow>
        </value>
    </block>
    <block type="espNtp_get" id="espNtp_get">
    </block>
</category>    `;
}
exports = registerToolboxs;
