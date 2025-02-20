import { OperationNode } from './operation-node.js'
import { freeze } from '../util/object-utils.js'
import { IdentifierNode } from './identifier-node.js'

export type AddValueNodeProps = Omit<AddValueNode, 'kind' | 'value'>

export interface AddValueNode extends OperationNode {
    readonly kind: 'AddValueNode',
    readonly value: IdentifierNode
    ifNotExists?: boolean,
    before?: IdentifierNode,
    after?: IdentifierNode
}

/**
 * @internal
 */
export const AddValueNode = freeze({
    is(node: OperationNode): node is AddValueNode {
        return node.kind === 'AddValueNode'
    },
    create(
        value: IdentifierNode
    ): AddValueNode {
        return freeze({
            kind: 'AddValueNode',
            value
        })
    },

    cloneWithAddValueProps(
        node: AddValueNode,
        props: AddValueNodeProps
    ) : AddValueNode {
        return freeze({
            ...node,
            ...props
        })
    }
})
