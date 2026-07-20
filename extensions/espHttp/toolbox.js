/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPHTTP_CATEGORY}" id="ESPHTTP_CATEGORY" colour="#0FBD8C" secondaryColour="#0DA57A" iconURI="">
    <block type="espHttp_get" id="espHttp_get">
        <value name="URL">
            <shadow type="text">
                <field name="TEXT">http://example.com</field>
            </shadow>
        </value>
    </block>
    <block type="espHttp_post" id="espHttp_post">
        <value name="URL">
            <shadow type="text">
                <field name="TEXT">http://example.com</field>
            </shadow>
        </value>
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">data</field>
            </shadow>
        </value>
    </block>
    <block type="espHttp_statusCode" id="espHttp_statusCode">
    </block>
    <block type="espHttp_response" id="espHttp_response">
    </block>
</category>    `;
}
exports = registerToolboxs;
