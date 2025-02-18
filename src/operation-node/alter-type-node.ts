import { OperationNode } from './operation-node.js'
import { freeze } from '../util/object-utils.js'
import { SchemableIdentifierNode } from './schemable-identifier-node.js'
import { IdentifierNode } from './identifier-node.js'

export type AlterTypeNodeProps = Omit<AlterTypeNode, 'kind' | 'name'>

export interface AlterTypeNode extends OperationNode {
    readonly kind: 'AlterTypeNode',
    readonly name: SchemableIdentifierNode,
    renameTo?: SchemableIdentifierNode,
    ownerTo?: IdentifierNode,
    setSchema?: IdentifierNode,
    //ADD VALUE [ IF NOT EXISTS ] [ BEFORE | AFTER ]
    renameValue?: IdentifierNode,
}

/**
 * @internal
 */
export const AlterTypeNode = freeze({
    is(node: OperationNode): node is AlterTypeNode {
        return node.kind === 'AlterTypeNode'
    },

    create(
        name: SchemableIdentifierNode,
    ): AlterTypeNode {
        return freeze({
            kind: 'AlterTypeNode',
            name,
        })
    },
})
